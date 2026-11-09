package com.autocare360.vehiculo.infrastructure.adapter.in.web.mapper;

import com.autocare360.vehiculo.domain.model.Vehiculo;
import com.autocare360.vehiculo.infrastructure.adapter.in.web.dto.CrearVehiculoRequest;
import com.autocare360.vehiculo.infrastructure.adapter.in.web.dto.VehiculoResponse;

public final class VehiculoWebMapper {

    private VehiculoWebMapper() {
    }

    public static Vehiculo toDomain(CrearVehiculoRequest request) {
        if (request == null) {
            return null;
        }
        return new Vehiculo(
                null,
                request.clienteId(),
                request.placa(),
                request.tipo(),
                request.marca(),
                request.modelo(),
                request.color()
        );
    }

    public static VehiculoResponse toResponse(Vehiculo domain) {
        if (domain == null) {
            return null;
        }
        return new VehiculoResponse(
                domain.getVehiculoId(),
                domain.getClienteId(),
                domain.getPlaca(),
                domain.getTipo().name(),
                domain.getMarca(),
                domain.getModelo(),
                domain.getColor()
        );
    }
}