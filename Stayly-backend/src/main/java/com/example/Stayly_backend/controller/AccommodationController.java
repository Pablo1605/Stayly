package com.example.Stayly_backend.controller;

import com.example.Stayly_backend.dto.AccommodationCardDto;
import com.example.Stayly_backend.dto.AccommodationResponseDto;
import com.example.Stayly_backend.dto.CreateAccommodationDto;
import com.example.Stayly_backend.dto.UpdateAccommodationDto;
import com.example.Stayly_backend.entity.enums.AccommodationStatus;
import com.example.Stayly_backend.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/accommodations")
@Validated
public class AccommodationController {
    private final AccommodationService accommodationService;

    @GetMapping
    public ResponseEntity<List<AccommodationCardDto>> getAllAccommodations() {
        List<AccommodationCardDto> accommodations = accommodationService.getAll();
        return ResponseEntity.ok(accommodations);
    }

    @GetMapping("/{accommodationId}")
    public ResponseEntity<AccommodationResponseDto> getAccommodation(@PathVariable Long accommodationId) {
        AccommodationResponseDto accommodation = accommodationService.getById(accommodationId);
        return ResponseEntity.ok(accommodation);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AccommodationCardDto>> searchAccommodations(@RequestParam(required = false) String city, @RequestParam(required = false) String title, @RequestParam(required = false) BigDecimal minPrice, @RequestParam(required = false) BigDecimal maxPrice, @RequestParam(required = false) int minGuest) {
        List<AccommodationCardDto> accommodations = accommodationService.search(city, title, minPrice, maxPrice, minGuest);
        return ResponseEntity.ok(accommodations);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AccommodationResponseDto> createAccommodation(@RequestPart("data") CreateAccommodationDto dto,
                                                                        @RequestPart("images") List<MultipartFile> images) {
        AccommodationResponseDto createdAccommodation = accommodationService.create(dto, images);
        return ResponseEntity.ok(createdAccommodation);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{accommodationId}")
    public ResponseEntity<AccommodationResponseDto> updateAccommodation(@PathVariable Long accommodationId, @RequestBody UpdateAccommodationDto dto) {
        AccommodationResponseDto updatedAccommodation = accommodationService.update(accommodationId, dto);
        return ResponseEntity.ok(updatedAccommodation);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{accommodationId}")
    public ResponseEntity<Void> deleteAccommodation(@PathVariable Long accommodationId) {
        accommodationService.delete(accommodationId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{accommodationId}/status")
    public ResponseEntity<AccommodationResponseDto> updateStatus(@PathVariable Long accommodationId, @RequestParam AccommodationStatus status) {
        AccommodationResponseDto updatedAccommodation = accommodationService.changeStatus(accommodationId, status);
        return ResponseEntity.ok(updatedAccommodation);
    }
}
