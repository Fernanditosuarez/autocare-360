package com.autocare360.shared.infrastructure.adapter.in.web;

import com.autocare360.shared.infrastructure.adapter.in.web.dto.HealthResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public HealthResponse check() {
        return new HealthResponse("UP", "AutoCare-360-Backend", Instant.now());
    }
}