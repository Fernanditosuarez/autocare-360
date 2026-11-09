package com.autocare360.vehiculo.domain.model;

public class Vehiculo {

    private final Long vehiculoId;
    private final Long clienteId;
    private final String placa;
    private final TipoVehiculo tipo;
    private final String marca;
    private final String modelo;
    private final String color;

    public Vehiculo(Long vehiculoId, Long clienteId, String placa, TipoVehiculo tipo,
                    String marca, String modelo, String color) {
        if (placa == null || placa.trim().isEmpty()) {
            throw new IllegalArgumentException("La placa del vehiculo es obligatoria y no puede estar vacia.");
        }
        if (tipo == null) {
            throw new IllegalArgumentException("El tipo de vehiculo es obligatorio.");
        }
        this.vehiculoId = vehiculoId;
        this.clienteId = clienteId;
        this.placa = placa.trim().toUpperCase();
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
    }

    public Long getVehiculoId() {
        return vehiculoId;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public String getPlaca() {
        return placa;
    }

    public TipoVehiculo getTipo() {
        return tipo;
    }

    public String getMarca() {
        return marca;
    }

    public String getModelo() {
        return modelo;
    }

    public String getColor() {
        return color;
    }

    @Override
    public String toString() {
        return "Vehiculo{" +
                "placa='" + placa + '\'' +
                ", tipo=" + tipo +
                ", marca='" + marca + '\'' +
                ", modelo='" + modelo + '\'' +
                '}';
    }
}