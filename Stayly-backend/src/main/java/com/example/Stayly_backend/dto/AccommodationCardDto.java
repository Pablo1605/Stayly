package com.example.Stayly_backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationCardDto {
    private Long id;
    private String title;
    private String description;
    private BigDecimal pricePerNight;
    private Integer maxGuest;
    private Integer maxBedrooms;
    private String city;
    private Double rating;
    private String address;
    private String image;
    private List<ImageResponseDto> images;
}
