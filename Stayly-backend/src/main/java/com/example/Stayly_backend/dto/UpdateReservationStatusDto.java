package com.example.Stayly_backend.dto;

import com.example.Stayly_backend.entity.enums.ReservationStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReservationStatusDto {
    private ReservationStatus status;
}
