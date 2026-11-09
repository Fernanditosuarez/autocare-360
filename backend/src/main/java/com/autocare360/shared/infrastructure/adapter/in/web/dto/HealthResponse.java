package com.autocare360.shared.infrastructure.adapter.in.web.dto;

import java.time.Instant;

public record HealthResponse(
        String status,
        String app,
        Instant timestamp
) {}