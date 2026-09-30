package com.example.Stayly_backend.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseSchemaInitializer {
    private final JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void updateReservationStatusConstraint() {
        jdbcTemplate.execute("""
                DO $$
                BEGIN
                    IF EXISTS (
                        SELECT 1
                        FROM pg_constraint
                        WHERE conname = 'reservations_status_check'
                    ) THEN
                        ALTER TABLE reservations DROP CONSTRAINT reservations_status_check;
                    END IF;

                    ALTER TABLE reservations
                        ADD CONSTRAINT reservations_status_check
                        CHECK (status IN ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED'));
                END $$;
                """);
    }
}
