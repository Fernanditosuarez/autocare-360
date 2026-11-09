package com.autocare360.cliente.application;

import com.autocare360.cliente.domain.model.Cliente;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteDemoService {

    public List<Cliente> obtenerClientesDemo() {
        return List.of(
                new Cliente(100L, "Demo Carlos Mendoza", "10203040", "carlos.demo@autocare.com", "70011223", "Av. Las Palmas #123"),
                new Cliente(200L, "Demo Maria Fernandez", "20304050", "maria.demo@autocare.com", "71122334", "Calle Los Pinos #456")
        );
    }
}