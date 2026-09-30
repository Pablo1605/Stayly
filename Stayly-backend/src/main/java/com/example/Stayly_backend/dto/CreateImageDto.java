package com.example.Stayly_backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateImageDto {
    private String imageUrl;
    private String publicId;
    private Integer displayOrder;
}
