package com.autocare360.cliente.domain.model;

import com.autocare360.vehiculo.domain.model.Vehiculo;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Cliente {

    private final Long clienteId;
    private final String nombreCompleto;
    private final String documentoIdentidad;
    private final String correoElectronico;
    private final String telefono;
    private final String direccion;

    // Relación 1:N en memoria encapsulada
    private final List<Vehiculo> vehiculos = new ArrayList<>();

    public Cliente(Long clienteId, String nombreCompleto, String documentoIdentidad,
                   String correoElectronico, String telefono, String direccion) {
        this.clienteId = clienteId;
        this.nombreCompleto = nombreCompleto;
        this.documentoIdentidad = documentoIdentidad;
        this.correoElectronico = correoElectronico;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    // Método de negocio para asociar un vehículo al cliente
    public void agregarVehiculo(Vehiculo vehiculo) {
        if (vehiculo == null) {
            throw new IllegalArgumentException("No se puede agregar un vehiculo nulo.");
        }
        this.vehiculos.add(vehiculo);
    }

    public List<Vehiculo> getVehiculos() {
        return Collections.unmodifiableList(vehiculos);
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

    @Override
    public String toString() {
        return "Cliente{" +
                "clienteId=" + clienteId +
                ", nombreCompleto='" + nombreCompleto + '\'' +
                ", vehiculos=" + vehiculos.size() +
                '}';
    }
}