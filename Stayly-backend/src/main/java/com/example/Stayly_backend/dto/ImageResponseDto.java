package com.example.Stayly_backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageResponseDto {
    private Long id;
    private String imageUrl;
    private String publicId;
    private Integer displayOrder;
}
