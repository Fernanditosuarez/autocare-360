package com.autocare360.cliente.domain.port.in;

import com.autocare360.cliente.domain.model.Cliente;

public interface RegistrarClienteUseCase {
    Cliente registrar(Cliente cliente);
}