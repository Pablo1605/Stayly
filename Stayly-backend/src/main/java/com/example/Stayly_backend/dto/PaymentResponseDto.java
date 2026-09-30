package com.example.Stayly_backend.dto;

import com.example.Stayly_backend.entity.enums.PaymentMethod;
import com.example.Stayly_backend.entity.enums.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDto {
    private Long id;
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private Instant paidAt;
}
