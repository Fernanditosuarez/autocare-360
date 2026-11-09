package com.autocare360;

import com.autocare360.cliente.application.ClienteService;
import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.infrastructure.adapter.out.memory.ClienteRepositoryEnMemoria;

public class Main {

    public static void main(String[] args) {
        System.out.println("=== CAPITULO 02: PRUEBA DE CONTRATOS, COLECCIONES Y EXCEPCIONES ===");

        // 1. Instanciar la implementación en memoria y el servicio desacoplado
        var repository = new ClienteRepositoryEnMemoria();
        var service = new ClienteService(repository);

        // 2. Registro exitoso de clientes válidos
        Cliente c1 = new Cliente(1L, "Carlos Mendoza", "10203040", "carlos@email.com", "70011223", "Av. Palmas");
        Cliente c2 = new Cliente(2L, "Maria Fernandez", "20304050", "maria@email.com", "71122334", "Calle Pinos");

        service.registrar(c1);
        service.registrar(c2);

        System.out.println("Total de clientes registrados en memoria: " + service.listar().size());
        System.out.println("Cliente obtenido por ID 1: " + service.obtener(1L).getNombreCompleto());

        // 3. Prueba negativa 1: Buscar ID inexistente (debe capturar ClienteNoEncontradoException)
        try {
            System.out.println("\nProbando busqueda de cliente inexistente (ID 999)...");
            service.obtener(999L);
        } catch (RuntimeException ex) {
            System.out.println("-> ERROR CONTROLADO CAPTURADO: " + ex.getMessage());
        }

        // 4. Prueba negativa 2: Registrar documento duplicado (debe capturar DocumentoIdentidadDuplicadoException)
        try {
            System.out.println("\nProbando registro con documento duplicado ('10203040')...");
            Cliente cDuplicado = new Cliente(3L, "Carlos Clon", "10203040", "otro@email.com", "79999999", "Calle 1");
            service.registrar(cDuplicado);
        } catch (RuntimeException ex) {
            System.out.println("-> ERROR CONTROLADO CAPTURADO: " + ex.getMessage());
        }

        System.out.println("\nValidacion del Capitulo 02 completada exitosamente.");
    }
}