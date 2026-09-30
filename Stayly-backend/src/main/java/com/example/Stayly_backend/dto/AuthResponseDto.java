package com.example.Stayly_backend.dto;

import com.example.Stayly_backend.entity.enums.Role;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private String email;
    private String username;
    private Role role;
}
