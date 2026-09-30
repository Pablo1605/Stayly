package com.example.Stayly_backend.config;

import com.example.Stayly_backend.dto.seed.AccommodationSeedDto;
import com.example.Stayly_backend.entity.Accommodation;
import com.example.Stayly_backend.entity.Image;
import com.example.Stayly_backend.entity.User;
import com.example.Stayly_backend.entity.enums.AccommodationStatus;
import com.example.Stayly_backend.entity.enums.Role;
import com.example.Stayly_backend.repository.AccommodationRepository;
import com.example.Stayly_backend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final AccommodationRepository accommodationRepository;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        loadAccommodations();
        loadAdmin();
    }

    private void loadAccommodations() throws IOException {

        if (accommodationRepository.count() > 0) {
            return;
        }

        InputStream inputStream = getClass()
                .getResourceAsStream("/data/accommodations.json");

        if (inputStream == null) {
            throw new IllegalStateException(
                    "accommodations.json was not found"
            );
        }

        List<AccommodationSeedDto> accommodations =
                objectMapper.readValue(
                        inputStream,
                        new TypeReference<List<AccommodationSeedDto>>() {}
                );

        List<Accommodation> entities = accommodations.stream()
                .map(this::toEntity)
                .toList();

        accommodationRepository.saveAll(entities);
    }

    private void loadAdmin() {

        if (userRepository.findByUsername("admin").isEmpty()) {

            User admin = new User();

            admin.setUsername("admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("1234"));
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);
        }
    }

    private Accommodation toEntity(AccommodationSeedDto dto) {

        Accommodation accommodation = Accommodation.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .pricePerNight(dto.getPricePerNight())
                .maxGuest(dto.getMaxGuest())
                .maxBedrooms(dto.getMaxBedrooms())
                .status(AccommodationStatus.AVAILABLE)
                .address(dto.getAddress())
                .city(dto.getCity())
                .rating(4.3)
                .build();

        dto.getImages().forEach(imageDto -> {
            Image image = Image.builder()
                    .imageUrl(imageDto.getUrl())
                    .publicId(imageDto.getPublicId())
                    .displayOrder(imageDto.getDisplayOrder())
                    .accommodation(accommodation)
                    .build();

            accommodation.getImages().add(image);
        });

        return accommodation;
    }
}