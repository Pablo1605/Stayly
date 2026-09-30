package com.example.Stayly_backend.controller;

import com.example.Stayly_backend.dto.FavoriteResponseDto;
import com.example.Stayly_backend.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favorites")
@Validated
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<FavoriteResponseDto>> getFavorites() {

        List<FavoriteResponseDto> favorites =
                favoriteService.getFavorites();

        return ResponseEntity.ok(favorites);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/{accommodationId}")
    public ResponseEntity<FavoriteResponseDto> addFavorite(
            @PathVariable Long accommodationId
    ) {

        FavoriteResponseDto addedFavorite =
                favoriteService.addFavorite(accommodationId);

        return ResponseEntity.ok(addedFavorite);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping("/{accommodationId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long accommodationId
    ) {

        favoriteService.removeFavorite(accommodationId);

        return ResponseEntity.noContent().build();
    }
}
