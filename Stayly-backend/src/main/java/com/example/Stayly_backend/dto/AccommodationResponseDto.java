package com.example.Stayly_backend.dto;

import com.example.Stayly_backend.entity.enums.AccommodationStatus;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationResponseDto {
    private Long id;
    private String title;
    private String description;
    private BigDecimal pricePerNight;
    private Integer maxGuest;
    private Integer maxBedrooms;
    private AccommodationStatus status;
    private String address;
    private String city;
    private double rating;
    private List<ImageResponseDto> images;
}
