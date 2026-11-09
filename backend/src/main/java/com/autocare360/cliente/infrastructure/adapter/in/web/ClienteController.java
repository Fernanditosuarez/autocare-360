package com.autocare360.cliente.infrastructure.adapter.in.web;

import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.mapper.ClientePersistenceMapper;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.repository.SpringDataClienteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final SpringDataClienteRepository repository;

    public ClienteController(SpringDataClienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return repository.findAll()
                .stream()
                .map(ClientePersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }
}