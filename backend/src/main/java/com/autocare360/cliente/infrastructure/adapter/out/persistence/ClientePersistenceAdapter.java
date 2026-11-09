package com.autocare360.cliente.infrastructure.adapter.out.persistence;

import com.autocare360.cliente.domain.model.Cliente;
import com.autocare360.cliente.domain.port.out.ClienteRepositoryPort;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.entity.ClienteJpaEntity;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.mapper.ClientePersistenceMapper;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.repository.SpringDataClienteRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ClientePersistenceAdapter implements ClienteRepositoryPort {

    private final SpringDataClienteRepository springDataRepository;

    public ClientePersistenceAdapter(SpringDataClienteRepository springDataRepository) {
        this.springDataRepository = springDataRepository;
    }

    @Override
    public Cliente guardar(Cliente cliente) {
        ClienteJpaEntity entity = ClientePersistenceMapper.toEntity(cliente);
        ClienteJpaEntity guardada = springDataRepository.save(entity);
        return ClientePersistenceMapper.toDomain(guardada);
    }

    @Override
    public Optional<Cliente> buscarPorId(Long id) {
        return springDataRepository.findById(id)
                .map(ClientePersistenceMapper::toDomain);
    }

    @Override
    public List<Cliente> listarTodos(String buscar) {
        return springDataRepository.findAll()
                .stream()
                .filter(c -> buscar == null || c.getNombreCompleto().toLowerCase().contains(buscar.toLowerCase()))
                .map(ClientePersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public boolean existePorDocumentoIdentidad(String documentoIdentidad) {
        return springDataRepository.findByDocumentoIdentidad(documentoIdentidad).isPresent();
    }
}