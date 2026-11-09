package com.autocare360.cliente.application;

import com.autocare360.cliente.domain.exception.ClienteNoEncontradoException;
import com.autocare360.cliente.domain.exception.DocumentoIdentidadDuplicadoException;
import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.domain.model.ClienteRepository;

import java.util.List;

public class ClienteService {

    private final ClienteRepository repository;

    // Inyección por constructor de la interfaz (desacoplada)
    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public Cliente registrar(Cliente cliente) {
        if (repository.existePorDocumentoIdentidad(cliente.getDocumentoIdentidad())) {
            throw new DocumentoIdentidadDuplicadoException(cliente.getDocumentoIdentidad());
        }
        return repository.guardar(cliente);
    }

    public Cliente obtener(Long id) {
        return repository.buscarPorId(id)
                .orElseThrow(() -> new ClienteNoEncontradoException(id));
    }

    public List<Cliente> listar() {
        return repository.listarTodos();
    }
}