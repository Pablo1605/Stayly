package com.example.Stayly_backend.mapper;

import com.example.Stayly_backend.dto.RatingResponseDto;
import com.example.Stayly_backend.entity.Rating;

import java.util.List;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RatingMapper {
    RatingResponseDto toResponseDto(Rating rating);
    List<RatingResponseDto> toResponseDtoList(List<Rating> ratings);
}
