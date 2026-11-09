package com.autocare360.vehiculo.infrastructure.adapter.out.persistence.mapper;

import com.autocare360.cliente.infrastructure.adapter.out.persistence.entity.ClienteJpaEntity;
import com.autocare360.vehiculo.domain.model.TipoVehiculo;
import com.autocare360.vehiculo.domain.model.Vehiculo;
import com.autocare360.vehiculo.infrastructure.adapter.out.persistence.entity.VehiculoJpaEntity;

public final class VehiculoPersistenceMapper {

    private VehiculoPersistenceMapper() {
    }

    public static Vehiculo toDomain(VehiculoJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return new Vehiculo(
                entity.getVehiculoId(),
                entity.getCliente().getClienteId(),
                entity.getPlaca(),
                TipoVehiculo.valueOf(entity.getTipo()),
                entity.getMarca(),
                entity.getModelo(),
                entity.getColor()
        );
    }

    public static VehiculoJpaEntity toEntity(Vehiculo domain, ClienteJpaEntity clienteEntity) {
        if (domain == null) {
            return null;
        }
        return new VehiculoJpaEntity(
                domain.getVehiculoId(),
                clienteEntity,
                domain.getPlaca(),
                domain.getTipo().name(),
                domain.getMarca(),
                domain.getModelo(),
                domain.getColor()
        );
    }
}