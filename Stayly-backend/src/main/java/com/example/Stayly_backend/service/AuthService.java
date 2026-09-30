package com.example.Stayly_backend.service;

import com.example.Stayly_backend.dto.AuthResponseDto;
import com.example.Stayly_backend.dto.LoginRequestDto;
import com.example.Stayly_backend.dto.RegisterRequestDto;

public interface AuthService {
    AuthResponseDto login(LoginRequestDto request);
    AuthResponseDto register(RegisterRequestDto requestDto);
    AuthResponseDto getCurrentUser();
    long countUsers();
}
