package com.example.Stayly_backend.mapper;

import com.example.Stayly_backend.dto.AccommodationCardDto;
import com.example.Stayly_backend.dto.AccommodationResponseDto;
import com.example.Stayly_backend.dto.CreateAccommodationDto;
import com.example.Stayly_backend.dto.UpdateAccommodationDto;
import com.example.Stayly_backend.entity.Accommodation;
import com.example.Stayly_backend.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AccommodationMapper {
    AccommodationResponseDto toResponseDto(Accommodation accommodation);

    @Mapping(target = "image", expression = "java(getMainImage(accommodation))")
    AccommodationCardDto toCardDto(Accommodation accommodation);

    default String getMainImage(Accommodation accommodation) {
        if (accommodation.getImages() == null) {
            return null;
        }

        return accommodation.getImages().stream()
                .filter(image -> image.getDisplayOrder() == 1)
                .map(Image::getImageUrl)
                .findFirst()
                .orElse(null);
    }

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(UpdateAccommodationDto updateDto, @MappingTarget Accommodation accommodation);

    Accommodation toEntity(CreateAccommodationDto dto);
}
