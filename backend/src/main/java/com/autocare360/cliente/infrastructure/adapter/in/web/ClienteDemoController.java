package com.autocare360.cliente.infrastructure.adapter.in.web;

import com.autocare360.cliente.application.ClienteDemoService;
import com.autocare360.cliente.domain.model.Cliente;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/demo/clientes")
public class ClienteDemoController {

    private final ClienteDemoService clienteDemoService;

    // Inyección por constructor requerida por el estándar del curso
    public ClienteDemoController(ClienteDemoService clienteDemoService) {
        this.clienteDemoService = clienteDemoService;
    }

    @GetMapping
    public List<Cliente> listarDemo() {
        return clienteDemoService.obtenerClientesDemo();
    }
}