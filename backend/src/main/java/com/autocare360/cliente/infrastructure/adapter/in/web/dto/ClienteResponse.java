package com.autocare360.cliente.infrastructure.adapter.in.web.dto;

public record ClienteResponse(
        Long clienteId,
        String nombreCompleto,
        String documentoIdentidad,
        String correoElectronico,
        String telefono,
        String direccion
) {}