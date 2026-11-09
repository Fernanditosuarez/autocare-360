package com.autocare360.vehiculo.domain.port.out;

import com.autocare360.vehiculo.domain.model.Vehiculo;

import java.util.List;
import java.util.Optional;

public interface VehiculoRepositoryPort {
    Vehiculo guardar(Vehiculo vehiculo);
    Optional<Vehiculo> buscarPorId(Long id);
    List<Vehiculo> listarPorClienteId(Long clienteId);
    List<Vehiculo> listarTodos();
    boolean existePorPlaca(String placa);
}