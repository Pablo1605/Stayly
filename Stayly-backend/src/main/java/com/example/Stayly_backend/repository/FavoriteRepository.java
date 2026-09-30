package com.example.Stayly_backend.repository;

import com.example.Stayly_backend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserId(Long userId);

    boolean existsByUserIdAndAccommodationId(
            Long userId,
            Long accommodationId
    );

    void deleteByUserIdAndAccommodationId(
            Long userId,
            Long accommodationId
    );
}
