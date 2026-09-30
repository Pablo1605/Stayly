package com.example.Stayly_backend.service;

import com.example.Stayly_backend.dto.FavoriteResponseDto;

import java.util.List;

public interface FavoriteService {

    FavoriteResponseDto addFavorite(Long accommodationId);

    void removeFavorite(Long accommodationId);

    List<FavoriteResponseDto> getFavorites();
}
