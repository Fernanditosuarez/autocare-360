package com.autocare360.cliente.domain.model;

public class Cliente {

    private final Long clienteId;
    private final String nombreCompleto;
    private final String documentoIdentidad;
    private final String correoElectronico;
    private final String telefono;
    private final String direccion;

    public Cliente(Long clienteId, String nombreCompleto, String documentoIdentidad,
                   String correoElectronico, String telefono, String direccion) {
        this.clienteId = clienteId;
        this.nombreCompleto = nombreCompleto;
        this.documentoIdentidad = documentoIdentidad;
        this.correoElectronico = correoElectronico;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getDocumentoIdentidad() {
        return documentoIdentidad;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getDireccion() {
        return direccion;
    }
}