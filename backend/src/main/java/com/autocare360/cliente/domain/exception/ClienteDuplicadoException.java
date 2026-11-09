package com.autocare360.cliente.domain.exception;

public class ClienteDuplicadoException extends RuntimeException {
    public ClienteDuplicadoException(String message) {
        super(message);
    }
}