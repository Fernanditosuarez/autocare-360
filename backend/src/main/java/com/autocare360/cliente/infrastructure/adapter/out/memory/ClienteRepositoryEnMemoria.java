package com.autocare360.cliente.infrastructure.adapter.out.memory;

import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.domain.model.ClienteRepository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class ClienteRepositoryEnMemoria implements ClienteRepository {

    private final Map<Long, Cliente> datos = new LinkedHashMap<>();

    @Override
    public Cliente guardar(Cliente cliente) {
        datos.put(cliente.getClienteId(), cliente);
        return cliente;
    }

    @Override
    public Optional<Cliente> buscarPorId(Long id) {
        return Optional.ofNullable(datos.get(id));
    }

    @Override
    public List<Cliente> listarTodos() {
        return new ArrayList<>(datos.values());
    }

    @Override
    public boolean existePorDocumentoIdentidad(String documentoIdentidad) {
        if (documentoIdentidad == null) {
            return false;
        }
        return datos.values().stream()
                .anyMatch(c -> documentoIdentidad.equalsIgnoreCase(c.getDocumentoIdentidad()));
    }
}