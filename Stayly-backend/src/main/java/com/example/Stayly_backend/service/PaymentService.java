package com.example.Stayly_backend.service;

import com.example.Stayly_backend.dto.CreatePaymentDto;
import com.example.Stayly_backend.dto.PaymentResponseDto;

public interface PaymentService {

    PaymentResponseDto createPayment(CreatePaymentDto dto);

    PaymentResponseDto confirmPayment(Long paymentId);

    PaymentResponseDto getPaymentByReservation(Long reservationId);
}
