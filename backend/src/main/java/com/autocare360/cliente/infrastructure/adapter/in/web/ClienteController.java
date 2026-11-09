package com.autocare360.cliente.infrastructure.adapter.in.web;

import com.autocare360.cliente.infrastructure.adapter.in.web.dto.ClienteResponse;
import com.autocare360.cliente.infrastructure.adapter.in.web.dto.CrearClienteRequest;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.entity.ClienteJpaEntity;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.repository.SpringDataClienteRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final SpringDataClienteRepository repository;

    public ClienteController(SpringDataClienteRepository repository) {
        this.repository = repository;
    }

    // POST /cliente -> 201 Created (o 400 Bad Request si falla @Valid)
    @PostMapping
    public ResponseEntity<ClienteResponse> crear(@Valid @RequestBody CrearClienteRequest request) {
        ClienteJpaEntity entity = new ClienteJpaEntity(
                null,
                request.nombreCompleto(),
                request.documentoIdentidad(),
                request.correoElectronico(),
                request.telefono(),
                request.direccion()
        );

        ClienteJpaEntity guardado = repository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(guardado));
    }

    // GET /cliente -> 200 OK (soporta filtro opcional)
    @GetMapping
    public List<ClienteResponse> listar(@RequestParam(required = false) String buscar) {
        return repository.findAll()
                .stream()
                .filter(c -> buscar == null || c.getNombreCompleto().toLowerCase().contains(buscar.toLowerCase()))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // GET /cliente/{id} -> 200 OK si existe, 404 Not Found si no
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(entity -> ResponseEntity.ok(toResponse(entity)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    private ClienteResponse toResponse(ClienteJpaEntity entity) {
        return new ClienteResponse(
                entity.getClienteId(),
                entity.getNombreCompleto(),
                entity.getDocumentoIdentidad(),
                entity.getCorreoElectronico(),
                entity.getTelefono(),
                entity.getDireccion()
        );
    }
}