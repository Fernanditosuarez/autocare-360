package com.autocare360.cliente.application.service;

import com.autocare360.cliente.domain.exception.ClienteDuplicadoException;
import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.domain.port.in.ConsultarClienteUseCase;
import com.autocare360.cliente.domain.port.in.RegistrarClienteUseCase;
import com.autocare360.cliente.domain.port.out.ClienteRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService implements RegistrarClienteUseCase, ConsultarClienteUseCase {

    private final ClienteRepositoryPort repositoryPort;

    public ClienteService(ClienteRepositoryPort repositoryPort) {
        this.repositoryPort = repositoryPort;
    }

    @Override
    public Cliente registrar(Cliente cliente) {
        // Regla de negocio que protege la restricción UNIQUE de PostgreSQL
        if (repositoryPort.existePorDocumentoIdentidad(cliente.getDocumentoIdentidad())) {
            throw new ClienteDuplicadoException("Ya existe un cliente con documento: " + cliente.getDocumentoIdentidad());
        }
        return repositoryPort.guardar(cliente);
    }

    @Override
    public Optional<Cliente> buscarPorId(Long id) {
        return repositoryPort.buscarPorId(id);
    }

    @Override
    public List<Cliente> listarTodos(String buscar) {
        return repositoryPort.listarTodos(buscar);
    }
}