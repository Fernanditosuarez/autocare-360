package com.autocare360.vehiculo.domain.exception;

public class VehiculoNoEncontradoException extends RuntimeException {
    public VehiculoNoEncontradoException(Long id) {
        super("No existe el vehiculo con ID: " + id);
    }
}