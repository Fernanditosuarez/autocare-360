package com.autocare360.cliente.domain.exception;

public class DocumentoIdentidadDuplicadoException extends RuntimeException {
    public DocumentoIdentidadDuplicadoException(String documento) {
        super("Ya existe un cliente registrado con el documento de identidad: " + documento);
    }
}