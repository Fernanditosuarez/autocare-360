package com.autocare360.cliente.infrastructure.adapter.out.persistence.mapper;

import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.entity.ClienteJpaEntity;

public final class ClientePersistenceMapper {

    private ClientePersistenceMapper() {
    }

    public static Cliente toDomain(ClienteJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return new Cliente(
                entity.getClienteId(),
                entity.getNombreCompleto(),
                entity.getDocumentoIdentidad(),
                entity.getCorreoElectronico(),
                entity.getTelefono(),
                entity.getDireccion()
        );
    }

    public static ClienteJpaEntity toEntity(Cliente domain) {
        if (domain == null) {
            return null;
        }
        return new ClienteJpaEntity(
                domain.getClienteId(),
                domain.getNombreCompleto(),
                domain.getDocumentoIdentidad(),
                domain.getCorreoElectronico(),
                domain.getTelefono(),
                domain.getDireccion()
        );
    }
}