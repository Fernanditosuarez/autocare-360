package com.autocare360.cliente.domain.model;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository {
    Cliente guardar(Cliente cliente);
    Optional<Cliente> buscarPorId(Long id);
    List<Cliente> listarTodos();
    boolean existePorDocumentoIdentidad(String documentoIdentidad);
}