package com.example.Stayly_backend.controller;

import com.example.Stayly_backend.dto.CreateReservationDto;
import com.example.Stayly_backend.dto.ReservationResponseDto;
import com.example.Stayly_backend.dto.ReservationSummaryDto;
import com.example.Stayly_backend.dto.UpdateReservationStatusDto;
import com.example.Stayly_backend.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reservations")
@Validated
public class ReservationController {
    private final ReservationService reservationService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<ReservationResponseDto> createReservation(@RequestBody @Valid CreateReservationDto dto) {
        ReservationResponseDto createdReservation = reservationService.createReservation(dto);
        return ResponseEntity.ok(createdReservation);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<List<ReservationSummaryDto>> getUserReservations() {
        List<ReservationSummaryDto> myReservations = reservationService.getUserReservations();
        return ResponseEntity.ok(myReservations);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ReservationResponseDto>> getAllReservations() {
        List<ReservationResponseDto> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{accommodationId}")
    public ResponseEntity<List<ReservationResponseDto>> getAccommodationReservations(@PathVariable Long accommodationId) {
        List<ReservationResponseDto> accommodationReservations = reservationService.getAccommodationReservations(accommodationId);
        return ResponseEntity.ok(accommodationReservations);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{reservationId}/status")
    public ResponseEntity<ReservationResponseDto> updateStatus(@PathVariable Long reservationId, @RequestParam @Valid UpdateReservationStatusDto status) {
        ReservationResponseDto updatedReservation = reservationService.updateStatus(reservationId, status);
        return ResponseEntity.ok(updatedReservation);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long reservationId) {
        reservationService.cancelReservation(reservationId);
        return ResponseEntity.noContent().build();
    }
}
