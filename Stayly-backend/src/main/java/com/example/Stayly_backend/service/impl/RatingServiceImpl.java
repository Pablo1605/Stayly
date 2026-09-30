package com.example.Stayly_backend.service.impl;

import com.example.Stayly_backend.auth.CurrentUserProvider;
import com.example.Stayly_backend.dto.CreateRatingDto;
import com.example.Stayly_backend.dto.RatingResponseDto;
import com.example.Stayly_backend.entity.Accommodation;
import com.example.Stayly_backend.entity.Rating;
import com.example.Stayly_backend.entity.User;
import com.example.Stayly_backend.entity.enums.ReservationStatus;
import com.example.Stayly_backend.exception.ResourceNotFoundException;
import com.example.Stayly_backend.mapper.RatingMapper;
import com.example.Stayly_backend.repository.AccommodationRepository;
import com.example.Stayly_backend.repository.RatingRepository;
import com.example.Stayly_backend.repository.ReservationRepository;
import com.example.Stayly_backend.repository.UserRepository;
import com.example.Stayly_backend.service.RatingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final ReservationRepository reservationRepository;
    private final RatingMapper ratingMapper;
    private final AccommodationRepository accommodationRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    @Override
    @Transactional
    public RatingResponseDto createRating(Long accommodationId, CreateRatingDto dto) {
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found with id: " + accommodationId));

        User user = getCurrentUser();
        if (!reservationRepository.existsByAccommodationIdAndUserIdAndStatus(
                accommodationId, user.getId(), ReservationStatus.COMPLETED)) {
            throw new IllegalStateException("Only users with a completed reservation can rate this accommodation");
        }
        if (ratingRepository.existsByAccommodationIdAndUserId(accommodationId, user.getId())) {
            throw new IllegalStateException("User has already rated this accommodation");
        }
        
        if(dto.getRating()<1 || dto.getRating()>5){
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        Rating rating = new Rating();
        rating.setAccommodation(accommodation);
        rating.setUser(user);
        rating.setRating(dto.getRating());
        rating.setCreatedAt(LocalDateTime.now());

        Rating saved = ratingRepository.save(rating);
        updateAccommodationRating(accommodation);
        return toResponseDto(saved);
    }

    @Override
    public List<RatingResponseDto> getRatingsByAccommodation(Long accommodationId) {
        return ratingRepository.findByAccommodationId(accommodationId).stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Override
    @Transactional
    public void deleteRating(Long ratingId) {
        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id: " + ratingId));
        ratingRepository.delete(rating);
        if (rating.getAccommodation() != null) {
            updateAccommodationRating(rating.getAccommodation());
        }
    }

    private void updateAccommodationRating(Accommodation accommodation) {
        double average = ratingRepository.findByAccommodationId(accommodation.getId()).stream()
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(0.0);
        accommodation.setRating(average);
        accommodationRepository.save(accommodation);
    }

    private RatingResponseDto toResponseDto(Rating rating) {
        RatingResponseDto dto = ratingMapper.toResponseDto(rating);
        if (rating.getUser() != null) {
            dto.setUserId(rating.getUser().getId());
        }
        return dto;
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
