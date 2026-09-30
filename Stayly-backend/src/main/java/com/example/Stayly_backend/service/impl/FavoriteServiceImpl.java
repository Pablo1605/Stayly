package com.example.Stayly_backend.service.impl;

import com.example.Stayly_backend.auth.CurrentUserProvider;
import com.example.Stayly_backend.dto.AccommodationCardDto;
import com.example.Stayly_backend.dto.FavoriteResponseDto;
import com.example.Stayly_backend.entity.Accommodation;
import com.example.Stayly_backend.entity.Favorite;
import com.example.Stayly_backend.entity.User;
import com.example.Stayly_backend.exception.BadRequestException;
import com.example.Stayly_backend.exception.ResourceNotFoundException;
import com.example.Stayly_backend.mapper.AccommodationMapper;
import com.example.Stayly_backend.repository.AccommodationRepository;
import com.example.Stayly_backend.repository.FavoriteRepository;
import com.example.Stayly_backend.repository.UserRepository;
import com.example.Stayly_backend.service.FavoriteService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final AccommodationRepository accommodationRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;
    private final AccommodationMapper accommodationMapper;

    @Override
    @Transactional
    public FavoriteResponseDto addFavorite(Long accommodationId) {

        User user = getCurrentUser();

        if (favoriteRepository
                .existsByUserIdAndAccommodationId(
                        user.getId(),
                        accommodationId
                )) {

            throw new BadRequestException(
                    "This accommodation is already in favorites"
            );
        }

        Accommodation accommodation =
                accommodationRepository
                        .findById(accommodationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Accommodation not found with id: "
                                                + accommodationId
                                )
                        );

        Favorite favorite = Favorite.builder()
                .user(user)
                .accommodation(accommodation)
                .build();

        Favorite savedFavorite =
                favoriteRepository.save(favorite);

        return toResponseDto(savedFavorite);
    }

    @Override
    @Transactional
    public void removeFavorite(Long accommodationId) {

        User user = getCurrentUser();

        if (!favoriteRepository.existsByUserIdAndAccommodationId(
                user.getId(),
                accommodationId
        )) {
            throw new ResourceNotFoundException(
                    "Favorite not found with accommodation id: "
                            + accommodationId
            );
        }

        favoriteRepository.deleteByUserIdAndAccommodationId(
                user.getId(),
                accommodationId
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<FavoriteResponseDto> getFavorites() {

        User user = getCurrentUser();

        return favoriteRepository
                .findByUserId(user.getId())
                .stream()
                .map(this::toResponseDto)
                .toList();
    }

    private FavoriteResponseDto toResponseDto(
            Favorite favorite
    ) {

        AccommodationCardDto accommodationDto =
                accommodationMapper.toCardDto(
                        favorite.getAccommodation()
                );

        return FavoriteResponseDto.builder()
                .id(favorite.getId())
                .accommodation(accommodationDto)
                .build();
    }

    private User getCurrentUser() {

        String username =
                currentUserProvider.getCurrentUsername();

        return userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with username: "
                                        + username
                        )
                );
    }
}
