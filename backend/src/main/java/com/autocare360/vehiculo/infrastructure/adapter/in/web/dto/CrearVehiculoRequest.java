package com.autocare360.vehiculo.infrastructure.adapter.in.web.dto;

import com.autocare360.vehiculo.domain.model.TipoVehiculo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CrearVehiculoRequest(
        @NotNull(message = "El clienteId es obligatorio")
        Long clienteId,

        @NotBlank(message = "La placa es obligatoria")
        @Size(max = 20, message = "La placa no puede superar los 20 caracteres")
        String placa,

        @NotNull(message = "El tipo de vehiculo es obligatorio")
        TipoVehiculo tipo,

        @Size(max = 60, message = "La marca no puede superar los 60 caracteres")
        String marca,

        @Size(max = 60, message = "El modelo no puede superar los 60 caracteres")
        String modelo,

        @Size(max = 40, message = "El color no puede superar los 40 caracteres")
        String color
) {}