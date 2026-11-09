package com.autocare360.vehiculo.domain.port.in;

import com.autocare360.vehiculo.domain.model.Vehiculo;

import java.util.List;
import java.util.Optional;

public interface ConsultarVehiculoUseCase {
    Optional<Vehiculo> buscarPorId(Long id);
    List<Vehiculo> listarPorCliente(Long clienteId);
    List<Vehiculo> listarTodos();
}