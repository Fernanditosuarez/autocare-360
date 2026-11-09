package com.autocare360.vehiculo.domain.exception;

public class VehiculoDuplicadoException extends RuntimeException {
    public VehiculoDuplicadoException(String placa) {
        super("Ya existe un vehiculo registrado con la placa: " + placa);
    }
}