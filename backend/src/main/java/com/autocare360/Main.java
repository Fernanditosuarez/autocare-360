package com.autocare360;

import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.vehiculo.domain.model.TipoVehiculo;
import com.autocare360.vehiculo.domain.model.Vehiculo;

public class Main {

    public static void main(String[] args) {
        System.out.println("=== CAPITULO 01: PRUEBA DE DOMINIO JAVA 21 (AUTOCARE 360) ===");

        // 1. Crear el objeto padre
        Cliente cliente = new Cliente(
                1L,
                "Carlos Mendoza",
                "10203040",
                "carlos.mendoza@email.com",
                "70011223",
                "Av. Las Palmas #123"
        );

        // 2. Crear dos objetos dependientes
        Vehiculo v1 = new Vehiculo(101L, cliente.getClienteId(), "ABC-123", TipoVehiculo.AUTO, "Toyota", "Corolla", "Blanco");
        Vehiculo v2 = new Vehiculo(102L, cliente.getClienteId(), "XYZ-789", TipoVehiculo.SUV, "Nissan", "Kicks", "Gris");

        // 3. Relacionar mediante el método de negocio
        cliente.agregarVehiculo(v1);
        cliente.agregarVehiculo(v2);

        // 4. Imprimir la evidencia
        System.out.println("Cliente registrado: " + cliente.getNombreCompleto());
        System.out.println("Cantidad de vehiculos asociados: " + cliente.getVehiculos().size());
        for (Vehiculo v : cliente.getVehiculos()) {
            System.out.println(" -> " + v);
        }

        System.out.println("Validacion de encapsulamiento exitosa.");
    }
}