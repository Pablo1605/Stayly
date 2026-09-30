package com.example.Stayly_backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateReservationDto {
    private Long accommodationId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
}
