package com.example.Stayly_backend.repository;

import com.example.Stayly_backend.entity.Reservation;
import com.example.Stayly_backend.entity.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByAccommodationId(Long accommodationId);
    List<Reservation> findByStatus(ReservationStatus status);
    boolean existsByAccommodationIdAndUserIdAndStatus(Long accommodationId, Long userId, ReservationStatus status);
    boolean existsByAccommodationIdAndCheckInLessThanEqualAndCheckOutGreaterThanEqual(Long AccommodationId, LocalDate checkIn, LocalDate checkOut);
    List<Reservation> findByUserIdOrderByCreatedAtDesc(Long userId);
}
