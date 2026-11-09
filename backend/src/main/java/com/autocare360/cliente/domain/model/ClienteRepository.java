package com.autocare360.cliente.domain.model;

import java.util.Optional;

public interface ClienteRepository {
    Cliente guardar(Cliente cliente);
    Optional<Cliente> buscarPorId(Long id);
}