package com.autocare360.vehiculo.infrastructure.adapter.out.persistence;

import com.autocare360.cliente.infrastructure.adapter.out.persistence.entity.ClienteJpaEntity;
import com.autocare360.cliente.infrastructure.adapter.out.persistence.repository.SpringDataClienteRepository;
import com.autocare360.vehiculo.domain.model.Vehiculo;
import com.autocare360.vehiculo.domain.port.out.VehiculoRepositoryPort;
import com.autocare360.vehiculo.infrastructure.adapter.out.persistence.entity.VehiculoJpaEntity;
import com.autocare360.vehiculo.infrastructure.adapter.out.persistence.mapper.VehiculoPersistenceMapper;
import com.autocare360.vehiculo.infrastructure.adapter.out.persistence.repository.SpringDataVehiculoRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class VehiculoPersistenceAdapter implements VehiculoRepositoryPort {

    private final SpringDataVehiculoRepository vehiculoRepository;
    private final SpringDataClienteRepository clienteRepository;

    public VehiculoPersistenceAdapter(SpringDataVehiculoRepository vehiculoRepository,
                                      SpringDataClienteRepository clienteRepository) {
        this.vehiculoRepository = vehiculoRepository;
        this.clienteRepository = clienteRepository;
    }

    @Override
    public Vehiculo guardar(Vehiculo vehiculo) {
        // Obtenemos la referencia proxy al cliente sin disparar SELECT innecesario
        ClienteJpaEntity clienteRef = clienteRepository.getReferenceById(vehiculo.getClienteId());
        VehiculoJpaEntity entity = VehiculoPersistenceMapper.toEntity(vehiculo, clienteRef);
        VehiculoJpaEntity guardada = vehiculoRepository.save(entity);
        return VehiculoPersistenceMapper.toDomain(guardada);
    }

    @Override
    public Optional<Vehiculo> buscarPorId(Long id) {
        return vehiculoRepository.findById(id)
                .map(VehiculoPersistenceMapper::toDomain);
    }

    @Override
    public List<Vehiculo> listarPorClienteId(Long clienteId) {
        return vehiculoRepository.findByCliente_ClienteId(clienteId)
                .stream()
                .map(VehiculoPersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Vehiculo> listarTodos() {
        return vehiculoRepository.findAll()
                .stream()
                .map(VehiculoPersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public boolean existePorPlaca(String placa) {
        return vehiculoRepository.findByPlaca(placa).isPresent();
    }
}