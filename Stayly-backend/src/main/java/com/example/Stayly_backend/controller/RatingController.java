package com.example.Stayly_backend.controller;

import com.example.Stayly_backend.dto.CreateRatingDto;
import com.example.Stayly_backend.dto.RatingResponseDto;
import com.example.Stayly_backend.service.RatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/ratings")
@Validated
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("/accommodation/{accommodationId}")
    public ResponseEntity<List<RatingResponseDto>> getRatingByAccommodation(@PathVariable Long accommodationId) {
        List<RatingResponseDto> accommodationRatings = ratingService.getRatingsByAccommodation(accommodationId);
        return ResponseEntity.ok(accommodationRatings);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{accommodationId}")
    public ResponseEntity<RatingResponseDto> createRating(@PathVariable Long accommodationId, @RequestBody @Valid CreateRatingDto dto) {
        RatingResponseDto createdRating = ratingService.createRating(accommodationId, dto);
        return ResponseEntity.ok(createdRating);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @DeleteMapping("/{ratingId}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long ratingId) {
        ratingService.deleteRating(ratingId);
        return ResponseEntity.noContent().build();
    }
}
