package com.autocare360.cliente.domain.port.out;

import com.autocare360.cliente.domain.model.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteRepositoryPort {
    Cliente guardar(Cliente cliente);
    Optional<Cliente> buscarPorId(Long id);
    List<Cliente> listarTodos(String buscar);
    boolean existePorDocumentoIdentidad(String documentoIdentidad);
}