package com.example.Stayly_backend.service;

import com.example.Stayly_backend.dto.CreateReservationDto;
import com.example.Stayly_backend.dto.ReservationResponseDto;
import com.example.Stayly_backend.dto.ReservationSummaryDto;
import com.example.Stayly_backend.dto.UpdateReservationStatusDto;

import java.time.LocalDate;
import java.util.List;

public interface ReservationService {

    ReservationResponseDto createReservation(CreateReservationDto dto);

    ReservationResponseDto cancelReservation(Long reservationId);

    List<ReservationSummaryDto> getUserReservations();

    List<ReservationResponseDto> getAccommodationReservations(Long accommodationId);

    List<ReservationResponseDto> getAllReservations();

    ReservationResponseDto updateStatus(Long reservationId, UpdateReservationStatusDto dto);

    void refreshExpiredReservations();

    boolean checkAvailability(Long accommodationId, LocalDate checkIn, LocalDate checkOut);
}
