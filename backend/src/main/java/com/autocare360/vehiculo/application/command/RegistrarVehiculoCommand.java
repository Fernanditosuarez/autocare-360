package com.autocare360.vehiculo.application.command;

import com.autocare360.vehiculo.domain.model.TipoVehiculo;

public record RegistrarVehiculoCommand(
        Long clienteId,
        String placa,
        TipoVehiculo tipo,
        String marca,
        String modelo,
        String color
) {}