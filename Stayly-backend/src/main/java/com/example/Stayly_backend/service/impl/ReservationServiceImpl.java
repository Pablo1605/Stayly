package com.example.Stayly_backend.service.impl;

import com.example.Stayly_backend.auth.CurrentUserProvider;
import com.example.Stayly_backend.dto.AccommodationCardDto;
import com.example.Stayly_backend.dto.CreateReservationDto;
import com.example.Stayly_backend.dto.ReservationResponseDto;
import com.example.Stayly_backend.dto.ReservationSummaryDto;
import com.example.Stayly_backend.dto.UpdateReservationStatusDto;
import com.example.Stayly_backend.entity.Accommodation;
import com.example.Stayly_backend.entity.Reservation;
import com.example.Stayly_backend.entity.User;
import com.example.Stayly_backend.entity.enums.AccommodationStatus;
import com.example.Stayly_backend.entity.enums.ReservationStatus;
import com.example.Stayly_backend.exception.ResourceNotFoundException;
import com.example.Stayly_backend.mapper.ReservationMapper;
import com.example.Stayly_backend.repository.AccommodationRepository;
import com.example.Stayly_backend.repository.ReservationRepository;
import com.example.Stayly_backend.repository.UserRepository;
import com.example.Stayly_backend.service.ReservationService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private final AccommodationRepository accommodationRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    @Override
    @Transactional
    public ReservationResponseDto createReservation(CreateReservationDto dto) {
        if (dto.getCheckIn() == null || dto.getCheckOut() == null || !dto.getCheckIn().isBefore(dto.getCheckOut())) {
            throw new IllegalArgumentException("Check-in must be before check-out");
        }

        Accommodation accommodation = accommodationRepository.findById(dto.getAccommodationId())
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found with id: " + dto.getAccommodationId()));

        if (accommodation.getStatus() != AccommodationStatus.AVAILABLE) {
            throw new IllegalStateException("Accommodation is not available for reservation");
        }

        if (dto.getGuests() != null && accommodation.getMaxGuest() != null && dto.getGuests() > accommodation.getMaxGuest()) {
            throw new IllegalArgumentException("Guest count exceeds accommodation capacity");
        }

        if (!checkAvailability(dto.getAccommodationId(), dto.getCheckIn(), dto.getCheckOut())) {
            throw new IllegalStateException("Accommodation is not available for the selected dates");
        }

        User user = getCurrentUser();
        Reservation reservation = new Reservation();
        reservation.setAccommodation(accommodation);
        reservation.setUser(user);
        reservation.setCheckIn(dto.getCheckIn());
        reservation.setCheckOut(dto.getCheckOut());
        reservation.setGuests(dto.getGuests());
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setTotalPrice(calculateTotalPrice(accommodation, dto.getCheckIn(), dto.getCheckOut()));

        accommodation.setStatus(AccommodationStatus.UNAVAILABLE);
        accommodationRepository.saveAndFlush(accommodation);
        Reservation saved = reservationRepository.save(reservation);
        return toResponseDto(saved);
    }

    @Override
    @Transactional
    public ReservationResponseDto cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + reservationId));
        if(reservation.getStatus() == ReservationStatus.CANCELED) {
            throw new IllegalStateException("Reservation is already canceled");
        }
        if (!reservation.getUser().getId().equals(getCurrentUser().getId())) {
            throw new IllegalStateException("You can only cancel your own reservations");
        }
        reservation.setStatus(ReservationStatus.CANCELED);
        reservation.getAccommodation().setStatus(AccommodationStatus.AVAILABLE);
        accommodationRepository.saveAndFlush(reservation.getAccommodation());
        return toResponseDto(reservationRepository.save(reservation));
    }

    @Override
    @Transactional
    public List<ReservationSummaryDto> getUserReservations() {
        refreshExpiredReservations();
        User user = getCurrentUser();
        return reservationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::toSummaryDto)
                .toList();
    }

    @Override
    public List<ReservationResponseDto> getAccommodationReservations(Long accommodationId) {
        return reservationRepository.findByAccommodationId(accommodationId).stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Override
    public List<ReservationResponseDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Override
    @Transactional
    public ReservationResponseDto updateStatus(Long reservationId, UpdateReservationStatusDto dto) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + reservationId));
        if(reservation.getStatus() == ReservationStatus.CANCELED) {
            throw new IllegalStateException("Cannot update status of a canceled reservation");
        }
        reservation.setStatus(dto.getStatus());
        reservation.getAccommodation().setStatus(dto.getStatus() == ReservationStatus.COMPLETED
                || dto.getStatus() == ReservationStatus.CANCELED
                ? AccommodationStatus.AVAILABLE
                : AccommodationStatus.UNAVAILABLE);
        accommodationRepository.saveAndFlush(reservation.getAccommodation());
        return toResponseDto(reservationRepository.save(reservation));
    }

    @Override
    @Transactional
    public void refreshExpiredReservations() {
        LocalDate today = LocalDate.now();
        List<Reservation> activeReservations = reservationRepository.findByStatus(ReservationStatus.PENDING);
        activeReservations.addAll(reservationRepository.findByStatus(ReservationStatus.CONFIRMED));

        activeReservations.stream()
                .filter(reservation -> reservation.getCheckOut() != null
                        && !reservation.getCheckOut().isAfter(today))
                .forEach(reservation -> {
                    reservation.setStatus(ReservationStatus.COMPLETED);
                    if (reservation.getAccommodation() != null) {
                        reservation.getAccommodation().setStatus(AccommodationStatus.AVAILABLE);
                        accommodationRepository.save(reservation.getAccommodation());
                    }
                });

        reservationRepository.saveAll(activeReservations.stream()
                .filter(reservation -> reservation.getStatus() == ReservationStatus.COMPLETED)
                .toList());
    }

    @Override
    public boolean checkAvailability(Long accommodationId, LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null || !checkIn.isBefore(checkOut)) {
            return false;
        }
        return !reservationRepository.existsByAccommodationIdAndCheckInLessThanEqualAndCheckOutGreaterThanEqual(accommodationId, checkIn, checkOut);
    }

    private ReservationResponseDto toResponseDto(Reservation reservation) {
        ReservationResponseDto dto = reservationMapper.toResponseDto(reservation);
        if (reservation.getAccommodation() != null) {
            AccommodationCardDto accommodationCardDto = new AccommodationCardDto();
            accommodationCardDto.setId(reservation.getAccommodation().getId());
            accommodationCardDto.setTitle(reservation.getAccommodation().getTitle());
            accommodationCardDto.setPricePerNight(reservation.getAccommodation().getPricePerNight());
            accommodationCardDto.setCity(reservation.getAccommodation().getCity());
            accommodationCardDto.setRating(reservation.getAccommodation().getRating());
            dto.setAccommodation(accommodationCardDto);
        }
        return dto;
    }

    private ReservationSummaryDto toSummaryDto(Reservation reservation) {
        ReservationSummaryDto dto = new ReservationSummaryDto();
        dto.setId(reservation.getId());
        dto.setAccommodationId(reservation.getAccommodation() != null ? reservation.getAccommodation().getId() : null);
        dto.setTitle(reservation.getAccommodation() != null ? reservation.getAccommodation().getTitle() : null);
        dto.setCity(reservation.getAccommodation() != null ? reservation.getAccommodation().getCity() : null);
        dto.setCheckIn(reservation.getCheckIn());
        dto.setCheckOut(reservation.getCheckOut());
        dto.setGuests(reservation.getGuests());
        dto.setStatus(getSummaryStatus(reservation));
        dto.setTotalPrice(reservation.getTotalPrice());
        dto.setImage(reservation.getAccommodation() != null && reservation.getAccommodation().getImages() != null
                && !reservation.getAccommodation().getImages().isEmpty()
                ? reservation.getAccommodation().getImages().get(0).getImageUrl()
                : null);
        return dto;
    }

    private ReservationStatus getSummaryStatus(Reservation reservation) {
        return reservation.getStatus();
    }

    private BigDecimal calculateTotalPrice(Accommodation accommodation, LocalDate checkIn, LocalDate checkOut) {
        long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
        BigDecimal pricePerNight = accommodation.getPricePerNight() != null ? accommodation.getPricePerNight() : BigDecimal.ZERO;
        return pricePerNight.multiply(BigDecimal.valueOf(nights));
    }

    private User getCurrentUser() {
        if (currentUserProvider == null || userRepository == null) {
            throw new IllegalStateException("Current user context is not available");
        }
        String username = currentUserProvider.getCurrentUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }
}
