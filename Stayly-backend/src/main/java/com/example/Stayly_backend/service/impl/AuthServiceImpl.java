package com.example.Stayly_backend.service.impl;

import com.example.Stayly_backend.auth.CurrentUserProvider;
import com.example.Stayly_backend.auth.JwtUtil;
import com.example.Stayly_backend.dto.AuthResponseDto;
import com.example.Stayly_backend.dto.LoginRequestDto;
import com.example.Stayly_backend.dto.RegisterRequestDto;
import com.example.Stayly_backend.entity.User;
import com.example.Stayly_backend.entity.enums.Role;
import com.example.Stayly_backend.repository.UserRepository;
import com.example.Stayly_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CurrentUserProvider currentUserProvider;

    @Override
    public AuthResponseDto login(LoginRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        String token = jwtUtil.generateToken(user.getUsername(), user.getEmail());

        return new AuthResponseDto(
                token,
                user.getEmail(),
                user.getUsername(),
                user.getRole()
        );
    }

    @Override
    public AuthResponseDto getCurrentUser() {
        String username = currentUserProvider.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        String token = jwtUtil.generateToken(user.getUsername(), user.getEmail());

        return new AuthResponseDto(
                token,
                user.getEmail(),
                user.getUsername(),
                user.getRole()
        );
    }

        @Override
        public long countUsers() {
                return userRepository.countByRole(Role.USER);
        }

    @Override
    public AuthResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "The username is already in use"
            );
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "The email is already in use"
            );
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Role.USER);

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(saved.getUsername(), saved.getEmail());

        return new AuthResponseDto(
                token,
                saved.getEmail(),
                saved.getUsername(),
                saved.getRole()
        );
    }
}
