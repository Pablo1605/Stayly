package com.example.Stayly_backend.controller;

import com.example.Stayly_backend.dto.CreatePaymentDto;
import com.example.Stayly_backend.dto.PaymentResponseDto;
import com.example.Stayly_backend.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/payments")
@Validated
public class PaymentController {
    private final PaymentService paymentService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<PaymentResponseDto> createPayment(@RequestBody @Valid CreatePaymentDto dto) {
        PaymentResponseDto createdPayment = paymentService.createPayment(dto);
        return ResponseEntity.ok(createdPayment);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{paymentId}/confirm")
    public ResponseEntity<PaymentResponseDto> confirmPayment(@PathVariable Long paymentId) {
        PaymentResponseDto confirmedPayment = paymentService.confirmPayment(paymentId);
        return ResponseEntity.ok(confirmedPayment);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{reservationId}")
    public ResponseEntity<PaymentResponseDto> getPaymentByReservation(@PathVariable Long reservationId) {
        PaymentResponseDto reservationPayments = paymentService.getPaymentByReservation(reservationId);
        return ResponseEntity.ok(reservationPayments);
    }
}
