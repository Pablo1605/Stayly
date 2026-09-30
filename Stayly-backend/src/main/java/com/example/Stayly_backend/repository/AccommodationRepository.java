package com.example.Stayly_backend.repository;

import com.example.Stayly_backend.entity.Accommodation;
import com.example.Stayly_backend.entity.enums.AccommodationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByStatus(AccommodationStatus status);
    List<Accommodation> findByCity(String city);
    List<Accommodation> findByTitleContainingIgnoreCase(String name);
    List<Accommodation> findByPricePerNightBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Accommodation> findByMaxGuestGreaterThanEqual(Integer capacity);
    List<Accommodation> findByRatingGreaterThanEqual(Double rating);
}