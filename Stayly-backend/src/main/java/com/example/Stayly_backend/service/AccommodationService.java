package com.example.Stayly_backend.service;

import com.example.Stayly_backend.dto.AccommodationCardDto;
import com.example.Stayly_backend.dto.AccommodationResponseDto;
import com.example.Stayly_backend.dto.CreateAccommodationDto;
import com.example.Stayly_backend.dto.UpdateAccommodationDto;
import com.example.Stayly_backend.entity.enums.AccommodationStatus;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface AccommodationService {

    List<AccommodationCardDto> getAll();

    AccommodationResponseDto getById(Long id);

    List<AccommodationCardDto> search(String city, String title, BigDecimal minPrice, BigDecimal maxPrice, Integer minGuests);

    AccommodationResponseDto create(CreateAccommodationDto dto, List<MultipartFile> images);

    AccommodationResponseDto update(Long id, UpdateAccommodationDto dto);

    void delete(Long id);

    AccommodationResponseDto changeStatus(Long id, AccommodationStatus status);

    List<AccommodationCardDto> getFeatured();

    List<AccommodationCardDto> getAvailable(LocalDate checkIn, LocalDate checkOut, Integer guests);
}
