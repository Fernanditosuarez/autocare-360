package com.autocare360.vehiculo.infrastructure.adapter.in.web.dto;

public record VehiculoResponse(
        Long vehiculoId,
        Long clienteId,
        String placa,
        String tipo,
        String marca,
        String modelo,
        String color
) {}