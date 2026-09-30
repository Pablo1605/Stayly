package com.example.Stayly_backend.mapper;

import com.example.Stayly_backend.dto.PaymentResponseDto;
import com.example.Stayly_backend.entity.Payment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    PaymentResponseDto toResponseDto(Payment payment);
    PaymentResponseDto toDto(Payment payment);
}
