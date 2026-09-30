package com.example.Stayly_backend.mapper;

import com.example.Stayly_backend.dto.AuthResponseDto;
import com.example.Stayly_backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    AuthResponseDto toDTO(User user);
    User toEntity(AuthResponseDto userDto);
}
