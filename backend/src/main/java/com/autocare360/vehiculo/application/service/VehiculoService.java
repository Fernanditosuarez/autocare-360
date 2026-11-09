package com.autocare360.vehiculo.application.service;

import com.autocare360.cliente.domain.exception.ClienteNoEncontradoException;
import com.autocare360.cliente.domain.port.in.ConsultarClienteUseCase;
import com.autocare360.vehiculo.domain.exception.VehiculoDuplicadoException;
import com.autocare360.vehiculo.domain.model.Vehiculo;
import com.autocare360.vehiculo.domain.port.in.ConsultarVehiculoUseCase;
import com.autocare360.vehiculo.domain.port.in.RegistrarVehiculoUseCase;
import com.autocare360.vehiculo.domain.port.out.VehiculoRepositoryPort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Vehiculo registrar(Vehiculo vehiculo) {
        // 1. Validar existencia del padre -> lanza ClienteNoEncontradoException (404)
        if (consultarClienteUseCase.buscarPorId(vehiculo.getClienteId()).isEmpty()) {
            throw new ClienteNoEncontradoException(vehiculo.getClienteId());
        }

        // 2. Validar conflicto de negocio -> lanza VehiculoDuplicadoException (409)
        if (repositoryPort.existePorPlaca(vehiculo.getPlaca())) {
            throw new VehiculoDuplicadoException(vehiculo.getPlaca());
        }

        // 3. Persistir atómicamente
        return repositoryPort.guardar(vehiculo);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Vehiculo> buscarPorId(Long id) {
        return repositoryPort.buscarPorId(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> listarPorCliente(Long clienteId) {
        return repositoryPort.listarPorClienteId(clienteId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> listarTodos() {
        return repositoryPort.listarTodos();
    }
}