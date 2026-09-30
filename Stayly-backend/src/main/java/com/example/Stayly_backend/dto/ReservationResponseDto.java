package com.example.Stayly_backend.dto;

import com.example.Stayly_backend.entity.enums.ReservationStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDto {
    private Long id;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private LocalDateTime createdAt;
    private Integer guests;
    private BigDecimal totalPrice;
    private ReservationStatus status;
    private AccommodationCardDto accommodation;
    private PaymentResponseDto payment;
}
