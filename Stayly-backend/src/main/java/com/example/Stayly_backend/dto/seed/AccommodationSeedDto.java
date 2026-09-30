package com.example.Stayly_backend.dto.seed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationSeedDto {
    private String title;
    private String description;
    private BigDecimal pricePerNight;
    private Integer maxGuest;
    private Integer maxBedrooms;
    private String address;
    private String city;
    private List<ImageSeedDto> images;
}