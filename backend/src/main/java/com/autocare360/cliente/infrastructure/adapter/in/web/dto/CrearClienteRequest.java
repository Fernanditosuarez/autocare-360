package com.autocare360.cliente.infrastructure.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CrearClienteRequest(
        @NotBlank(message = "El nombre completo es obligatorio")
        @Size(max = 150, message = "El nombre no puede superar los 150 caracteres")
        String nombreCompleto,

        @NotBlank(message = "El documento de identidad es obligatorio")
        @Size(max = 20, message = "El documento no puede superar los 20 caracteres")
        String documentoIdentidad,

        @Email(message = "El formato del correo electronico es invalido")
        @Size(max = 100, message = "El correo no puede superar los 100 caracteres")
        String correoElectronico,

        @Size(max = 20, message = "El telefono no puede superar los 20 caracteres")
        String telefono,

        @Size(max = 20, message = "La direccion no puede superar los 200 caracteres")
        String direccion
) {}