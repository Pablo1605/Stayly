package com.example.Stayly_backend.dto;

import com.example.Stayly_backend.entity.enums.ReservationStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationSummaryDto {
    private Long id;
    private Long accommodationId;
    private String title;
    private String city;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
    private ReservationStatus status;
    private BigDecimal totalPrice;
    private String image;
}
