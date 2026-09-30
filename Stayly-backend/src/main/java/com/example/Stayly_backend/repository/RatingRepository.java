package com.example.Stayly_backend.repository;

import com.example.Stayly_backend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByAccommodationId(Long accommodationId);
    List<Rating> findByUserId(Long userId);
    boolean existsByAccommodationIdAndUserId(Long accommodationId, Long userId);
}
