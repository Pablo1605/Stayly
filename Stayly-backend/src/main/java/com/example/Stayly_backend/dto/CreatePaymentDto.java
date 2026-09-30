package com.example.Stayly_backend.dto;

import com.example.Stayly_backend.entity.enums.PaymentMethod;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePaymentDto {
    private Long reservationId;
    private PaymentMethod paymentMethod;
}
