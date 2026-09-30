package com.example.Stayly_backend.mapper;

import com.example.Stayly_backend.dto.CreateReservationDto;
import com.example.Stayly_backend.dto.ReservationResponseDto;
import com.example.Stayly_backend.entity.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReservationMapper {
    ReservationResponseDto toResponseDto(Reservation reservation);

    @Mapping(target = "id", ignore = true)
    Reservation toEntityFromCreate(CreateReservationDto createDto);
}
