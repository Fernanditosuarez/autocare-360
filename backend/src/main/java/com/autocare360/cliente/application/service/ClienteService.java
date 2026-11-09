package com.autocare360.cliente.application.service;

import com.autocare360.cliente.domain.exception.ClienteDuplicadoException;
import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.domain.port.in.ConsultarClienteUseCase;
import com.autocare360.cliente.domain.port.in.RegistrarClienteUseCase;
import com.autocare360.cliente.domain.port.out.ClienteRepositoryPort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService implements RegistrarClienteUseCase, ConsultarClienteUseCase {

    private final ClienteRepositoryPort repositoryPort;

    public ClienteService(ClienteRepositoryPort repositoryPort) {
        this.repositoryPort = repositoryPort;
    }

    @Override
    @Transactional
    public Cliente registrar(Cliente cliente) {
        if (repositoryPort.existePorDocumentoIdentidad(cliente.getDocumentoIdentidad())) {
            throw new ClienteDuplicadoException("Ya existe un cliente con documento: " + cliente.getDocumentoIdentidad());
        }
        return repositoryPort.guardar(cliente);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Cliente> buscarPorId(Long id) {
        return repositoryPort.buscarPorId(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Cliente> listarTodos(String buscar) {
        return repositoryPort.listarTodos(buscar);
    }
}