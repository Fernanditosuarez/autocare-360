package com.autocare360.cliente.domain.port.in;

import com.autocare360.cliente.domain.model.Cliente;

import java.util.List;
import java.util.Optional;

public interface ConsultarClienteUseCase {
    Optional<Cliente> buscarPorId(Long id);
    List<Cliente> listarTodos(String buscar);
}