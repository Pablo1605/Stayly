package com.example.Stayly_backend.service.impl;

import com.example.Stayly_backend.dto.AccommodationCardDto;
import com.example.Stayly_backend.dto.AccommodationResponseDto;
import com.example.Stayly_backend.dto.CreateAccommodationDto;
import com.example.Stayly_backend.dto.UpdateAccommodationDto;
import com.example.Stayly_backend.entity.Accommodation;
import com.example.Stayly_backend.entity.Image;
import com.example.Stayly_backend.entity.enums.AccommodationStatus;
import com.example.Stayly_backend.entity.enums.ReservationStatus;
import com.example.Stayly_backend.exception.BadRequestException;
import com.example.Stayly_backend.exception.ResourceNotFoundException;
import com.example.Stayly_backend.mapper.AccommodationMapper;
import com.example.Stayly_backend.repository.AccommodationRepository;
import com.example.Stayly_backend.repository.ReservationRepository;
import com.example.Stayly_backend.service.AccommodationService;
import com.example.Stayly_backend.service.ReservationService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class AccommodationServiceImpl implements AccommodationService {
    private final AccommodationRepository accommodationRepository;
    private final AccommodationMapper accommodationMapper;
    private final ReservationRepository reservationRepository;
    private final ReservationService reservationService;
    private final CloudinaryService cloudinaryService;

    @Override
    @Transactional(readOnly = true)
    public List<AccommodationCardDto> getAll() {
        return accommodationRepository.findAll().stream()
                .map(this::toCardDto)
                .toList();
    }

    @Override
    @Transactional
    public AccommodationResponseDto getById(Long id) {
        reservationService.refreshExpiredReservations();
        Accommodation accommodation = findAccommodationOrThrow(id);
        return toResponseDto(accommodation);
    }

    @Override
    public List<AccommodationCardDto> search(String city, String title, BigDecimal minPrice, BigDecimal maxPrice, Integer minGuests) {
        Stream<Accommodation> stream = accommodationRepository.findAll().stream();

        if (city != null && !city.isBlank()) {
            stream = stream.filter(accommodation -> city.equalsIgnoreCase(accommodation.getCity()));
        }
        if (title != null && !title.isBlank()) {
            stream = stream.filter(accommodation -> accommodation.getTitle() != null
                    && accommodation.getTitle().toLowerCase().contains(title.toLowerCase()));
        }
        if (minPrice != null) {
            stream = stream.filter(accommodation -> accommodation.getPricePerNight() != null
                    && accommodation.getPricePerNight().compareTo(minPrice) >= 0);
        }
        if (maxPrice != null) {
            stream = stream.filter(accommodation -> accommodation.getPricePerNight() != null
                    && accommodation.getPricePerNight().compareTo(maxPrice) <= 0);
        }
        if (minGuests != null) {
            stream = stream.filter(accommodation -> accommodation.getMaxGuest() != null
                    && accommodation.getMaxGuest() >= minGuests);
        }

        return stream.map(this::toCardDto).toList();
    }

    @Override
    @Transactional
    public AccommodationResponseDto create(
            CreateAccommodationDto dto,
            List<MultipartFile> images) {

        validateImages(images);

        Accommodation accommodation = accommodationMapper.toEntity(dto);

        List<Image> accommodationImages = new ArrayList<>();

        for (int i = 0; i < images.size(); i++) {

            MultipartFile file = images.get(i);

            Map<String, Object> result =
                    cloudinaryService.uploadImage(file);

            Image image = Image.builder()
                    .imageUrl((String) result.get("secure_url"))
                    .publicId((String) result.get("public_id"))
                    .displayOrder(i + 1)
                    .accommodation(accommodation)
                    .build();

            accommodationImages.add(image);
        }

        accommodation.setImages(accommodationImages);
        accommodation.setStatus(AccommodationStatus.AVAILABLE);

        Accommodation saved =
                accommodationRepository.save(accommodation);

        return accommodationMapper.toResponseDto(saved);
    }

    @Override
    @Transactional
    public AccommodationResponseDto update(Long id, UpdateAccommodationDto dto) {
        Accommodation accommodation = findAccommodationOrThrow(id);
        accommodationMapper.updateEntityFromDto(dto, accommodation);
        if (dto.getMaxBedrooms() != null) {
            accommodation.setMaxBedrooms(dto.getMaxBedrooms());
        }
        Accommodation saved = accommodationRepository.save(accommodation);
        return toResponseDto(saved);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Accommodation accommodation = findAccommodationOrThrow(id);
        for (Image image : accommodation.getImages()) {
            cloudinaryService.deleteImage(image.getPublicId());
        }
        accommodationRepository.delete(accommodation);
    }

    @Override
    @Transactional
    public AccommodationResponseDto changeStatus(Long id, AccommodationStatus status) {
        Accommodation accommodation = findAccommodationOrThrow(id);
        accommodation.setStatus(status);
        return toResponseDto(accommodationRepository.save(accommodation));
    }

    @Override
    public List<AccommodationCardDto> getFeatured() {
        return accommodationRepository.findByStatus(AccommodationStatus.AVAILABLE).stream()
                .sorted(Comparator.comparingDouble(Accommodation::getRating).reversed())
                .limit(5)
                .map(this::toCardDto)
                .toList();
    }

    @Override
    public List<AccommodationCardDto> getAvailable(LocalDate checkIn, LocalDate checkOut, Integer guests) {
        if (checkIn == null || checkOut == null || guests == null) {
            return List.of();
        }

        return accommodationRepository.findByStatus(AccommodationStatus.AVAILABLE).stream()
                .filter(accommodation -> accommodation.getMaxGuest() != null && accommodation.getMaxGuest() >= guests)
                .filter(accommodation -> reservationRepository == null || !hasConflictingReservation(accommodation, checkIn, checkOut))
                .map(this::toCardDto)
                .toList();
    }

    private Accommodation findAccommodationOrThrow(Long id) {
        return accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found with id: " + id));
    }

    private AccommodationResponseDto toResponseDto(Accommodation accommodation) {
        AccommodationResponseDto dto = accommodationMapper.toResponseDto(accommodation);
        dto.setMaxBedrooms(accommodation.getMaxBedrooms());
        return dto;
    }

    private AccommodationCardDto toCardDto(Accommodation accommodation) {
        return accommodationMapper.toCardDto(accommodation);
    }

    private boolean hasConflictingReservation(Accommodation accommodation, LocalDate checkIn, LocalDate checkOut) {
        if (accommodation.getReservations() == null) {
            return false;
        }
        return accommodation.getReservations().stream()
                .filter(reservation -> reservation.getStatus() != ReservationStatus.CANCELED)
                .anyMatch(reservation -> reservation.getCheckIn() != null && reservation.getCheckOut() != null
                        && reservation.getCheckIn().isBefore(checkOut)
                        && reservation.getCheckOut().isAfter(checkIn));
    }

    private void validateImages(List<MultipartFile> images) {

        if (images == null || images.isEmpty()) {
            throw new BadRequestException(
                    "You must add at least one image"
            );
        }

        if (images.size() > 3) {
            throw new BadRequestException(
                    "You cannot add more than 3 images"
            );
        }

        for (MultipartFile image : images) {

            if (image.isEmpty()) {
                throw new BadRequestException(
                        "One of the images is empty"
                );
            }
        }
    }

}
