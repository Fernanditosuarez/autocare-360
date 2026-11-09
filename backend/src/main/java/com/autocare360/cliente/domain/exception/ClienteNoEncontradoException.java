package com.autocare360.cliente.domain.exception;

public class ClienteNoEncontradoException extends RuntimeException {
    public ClienteNoEncontradoException(Long id) {
        super("No existe el cliente con ID: " + id);
    }
}