package com.example.Stayly_backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccommodationDto {
    private String title;
    private String description;
    private BigDecimal pricePerNight;
    private Integer maxGuest;
    private Integer maxBedrooms;
    private String address;
    private String city;
}
