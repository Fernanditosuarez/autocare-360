package com.autocare360.cliente.infrastructure.adapter.in.web.mapper;

import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.infrastructure.adapter.in.web.dto.ClienteResponse;
import com.autocare360.cliente.infrastructure.adapter.in.web.dto.CrearClienteRequest;

public final class ClienteWebMapper {

    private ClienteWebMapper() {
    }

    public static Cliente toDomain(CrearClienteRequest request) {
        if (request == null) {
            return null;
        }
        return new Cliente(
                null,
                request.nombreCompleto(),
                request.documentoIdentidad(),
                request.correoElectronico(),
                request.telefono(),
                request.direccion()
        );
    }

    public static ClienteResponse toResponse(Cliente domain) {
        if (domain == null) {
            return null;
        }
        return new ClienteResponse(
                domain.getClienteId(),
                domain.getNombreCompleto(),
                domain.getDocumentoIdentidad(),
                domain.getCorreoElectronico(),
                domain.getTelefono(),
                domain.getDireccion()
        );
    }
}