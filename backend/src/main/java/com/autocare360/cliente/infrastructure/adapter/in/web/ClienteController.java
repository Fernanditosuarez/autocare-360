package com.autocare360.cliente.infrastructure.adapter.in.web;

import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.domain.port.in.ConsultarClienteUseCase;
import com.autocare360.cliente.domain.port.in.RegistrarClienteUseCase;
import com.autocare360.cliente.infrastructure.adapter.in.web.dto.ClienteResponse;
import com.autocare360.cliente.infrastructure.adapter.in.web.dto.CrearClienteRequest;
import com.autocare360.cliente.infrastructure.adapter.in.web.mapper.ClienteWebMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final RegistrarClienteUseCase registrarClienteUseCase;
    private final ConsultarClienteUseCase consultarClienteUseCase;

    // Inyección por constructor de los Ports IN (Desacoplamiento total)
    public ClienteController(RegistrarClienteUseCase registrarClienteUseCase,
                             ConsultarClienteUseCase consultarClienteUseCase) {
        this.registrarClienteUseCase = registrarClienteUseCase;
        this.consultarClienteUseCase = consultarClienteUseCase;
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> crear(@Valid @RequestBody CrearClienteRequest request) {
        Cliente cliente = ClienteWebMapper.toDomain(request);
        Cliente guardado = registrarClienteUseCase.registrar(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(ClienteWebMapper.toResponse(guardado));
    }

    @GetMapping
    public List<ClienteResponse> listar(@RequestParam(required = false) String buscar) {
        return consultarClienteUseCase.listarTodos(buscar)
                .stream()
                .map(ClienteWebMapper::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Long id) {
        return consultarClienteUseCase.buscarPorId(id)
                .map(cliente -> ResponseEntity.ok(ClienteWebMapper.toResponse(cliente)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}