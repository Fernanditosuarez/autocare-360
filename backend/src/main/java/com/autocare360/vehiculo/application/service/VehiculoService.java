package com.autocare360.vehiculo.application.service;

import com.autocare360.cliente.domain.exception.ClienteNoEncontradoException;
import com.autocare360.cliente.domain.port.in.ConsultarClienteUseCase;
import com.autocare360.vehiculo.domain.exception.VehiculoDuplicadoException;
import com.autocare360.vehiculo.domain.model.Vehiculo;
import com.autocare360.vehiculo.domain.port.in.ConsultarVehiculoUseCase;
import com.autocare360.vehiculo.domain.port.in.RegistrarVehiculoUseCase;
import com.autocare360.vehiculo.domain.port.out.VehiculoRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService implements RegistrarVehiculoUseCase, ConsultarVehiculoUseCase {

    private final VehiculoRepositoryPort repositoryPort;
    private final ConsultarClienteUseCase consultarClienteUseCase;

    public VehiculoService(VehiculoRepositoryPort repositoryPort,
                           ConsultarClienteUseCase consultarClienteUseCase) {
        this.repositoryPort = repositoryPort;
        this.consultarClienteUseCase = consultarClienteUseCase;
    }

    @Override
    public Vehiculo registrar(Vehiculo vehiculo) {
        // 1. Validar que el cliente padre exista mediante el Port IN de Cliente
        if (consultarClienteUseCase.buscarPorId(vehiculo.getClienteId()).isEmpty()) {
            throw new ClienteNoEncontradoException(vehiculo.getClienteId());
        }

        // 2. Validar regla de negocio de unicidad de placa
        if (repositoryPort.existePorPlaca(vehiculo.getPlaca())) {
            throw new VehiculoDuplicadoException(vehiculo.getPlaca());
        }

        return repositoryPort.guardar(vehiculo);
    }

    @Override
    public Optional<Vehiculo> buscarPorId(Long id) {
        return repositoryPort.buscarPorId(id);
    }

    @Override
    public List<Vehiculo> listarPorCliente(Long clienteId) {
        return repositoryPort.listarPorClienteId(clienteId);
    }

    @Override
    public List<Vehiculo> listarTodos() {
        return repositoryPort.listarTodos();
    }
}