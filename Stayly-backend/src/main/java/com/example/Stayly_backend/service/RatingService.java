package com.example.Stayly_backend.service;

import com.example.Stayly_backend.dto.CreateRatingDto;
import com.example.Stayly_backend.dto.RatingResponseDto;

import java.util.List;

public interface RatingService {

    RatingResponseDto createRating(Long accommodationId, CreateRatingDto dto);

    List<RatingResponseDto> getRatingsByAccommodation(Long accommodationId);

    void deleteRating(Long ratingId);
}
