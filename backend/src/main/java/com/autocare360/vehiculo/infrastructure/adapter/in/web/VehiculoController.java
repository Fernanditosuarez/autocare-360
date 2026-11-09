package com.autocare360.vehiculo.infrastructure.adapter.in.web;

import com.autocare360.vehiculo.domain.model.Vehiculo;
import com.autocare360.vehiculo.domain.port.in.ConsultarVehiculoUseCase;
import com.autocare360.vehiculo.domain.port.in.RegistrarVehiculoUseCase;
import com.autocare360.vehiculo.infrastructure.adapter.in.web.dto.CrearVehiculoRequest;
import com.autocare360.vehiculo.infrastructure.adapter.in.web.dto.VehiculoResponse;
import com.autocare360.vehiculo.infrastructure.adapter.in.web.mapper.VehiculoWebMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vehiculo")
public class VehiculoController {

    private final RegistrarVehiculoUseCase registrarVehiculoUseCase;
    private final ConsultarVehiculoUseCase consultarVehiculoUseCase;

    public VehiculoController(RegistrarVehiculoUseCase registrarVehiculoUseCase,
                              ConsultarVehiculoUseCase consultarVehiculoUseCase) {
        this.registrarVehiculoUseCase = registrarVehiculoUseCase;
        this.consultarVehiculoUseCase = consultarVehiculoUseCase;
    }

    // POST /vehiculo -> 201 Created
    @PostMapping
    public ResponseEntity<VehiculoResponse> crear(@Valid @RequestBody CrearVehiculoRequest request) {
        Vehiculo vehiculo = VehiculoWebMapper.toDomain(request);
        Vehiculo guardado = registrarVehiculoUseCase.registrar(vehiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(VehiculoWebMapper.toResponse(guardado));
    }

    // GET /vehiculo/{id} -> 200 OK / 404 Not Found
    @GetMapping("/{id}")
    public ResponseEntity<VehiculoResponse> buscarPorId(@PathVariable Long id) {
        return consultarVehiculoUseCase.buscarPorId(id)
                .map(v -> ResponseEntity.ok(VehiculoWebMapper.toResponse(v)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // GET /vehiculo/cliente/{clienteId} -> 200 OK (Listar vehículos de un cliente)
    @GetMapping("/cliente/{clienteId}")
    public List<VehiculoResponse> listarPorCliente(@PathVariable Long clienteId) {
        return consultarVehiculoUseCase.listarPorCliente(clienteId)
                .stream()
                .map(VehiculoWebMapper::toResponse)
                .collect(Collectors.toList());
    }

    // GET /vehiculo -> 200 OK (Listar todos)
    @GetMapping
    public List<VehiculoResponse> listarTodos() {
        return consultarVehiculoUseCase.listarTodos()
                .stream()
                .map(VehiculoWebMapper::toResponse)
                .collect(Collectors.toList());
    }
}