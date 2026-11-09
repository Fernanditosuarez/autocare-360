package com.autocare360.vehiculo.domain.port.in;

import com.autocare360.vehiculo.domain.model.Vehiculo;

public interface RegistrarVehiculoUseCase {
    Vehiculo registrar(Vehiculo vehiculo);
}