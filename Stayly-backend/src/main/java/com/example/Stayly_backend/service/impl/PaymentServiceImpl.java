package com.example.Stayly_backend.service.impl;

import com.example.Stayly_backend.auth.CurrentUserProvider;
import com.example.Stayly_backend.dto.CreatePaymentDto;
import com.example.Stayly_backend.dto.PaymentResponseDto;
import com.example.Stayly_backend.entity.Payment;
import com.example.Stayly_backend.entity.Reservation;
import com.example.Stayly_backend.entity.User;
import com.example.Stayly_backend.entity.enums.PaymentStatus;
import com.example.Stayly_backend.entity.enums.Role;
import com.example.Stayly_backend.exception.ResourceNotFoundException;
import com.example.Stayly_backend.mapper.PaymentMapper;
import com.example.Stayly_backend.repository.PaymentRepository;
import com.example.Stayly_backend.repository.ReservationRepository;
import com.example.Stayly_backend.repository.UserRepository;
import com.example.Stayly_backend.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.Instant;

@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    @Override
    @Transactional
    public PaymentResponseDto createPayment(CreatePaymentDto dto) {
        Reservation reservation = reservationRepository.findById(dto.getReservationId())
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + dto.getReservationId()));

        Payment payment = new Payment();
        payment.setReservation(reservation);
        payment.setAmount(reservation.getTotalPrice());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setStatus(PaymentStatus.PENDING);

        Payment saved = paymentRepository.save(payment);
        return paymentMapper.toDto(saved);
    }

    @Override
    @Transactional
    public PaymentResponseDto confirmPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + paymentId));
        payment.setStatus(PaymentStatus.PAID);
        payment.setPaidAt(Instant.now());
        Payment saved = paymentRepository.save(payment);
        return paymentMapper.toDto(saved);
    }

    @Override
    public PaymentResponseDto getPaymentByReservation(Long reservationId) {
        Payment payment = paymentRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with reservation id: " + reservationId));
        if (!payment.getReservation().getUser().getId().equals(getCurrentUser().getId())
                && !getCurrentUser().getRole().equals(Role.ADMIN)) {
            throw new AccessDeniedException("...");
        }
        return paymentMapper.toDto(payment);
    }

    private User getCurrentUser() {
        if (currentUserProvider == null || userRepository == null) {
            throw new IllegalStateException("Current user context is not available");
        }
        String username = currentUserProvider.getCurrentUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }
}
