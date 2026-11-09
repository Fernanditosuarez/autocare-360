package com.autocare360.vehiculo.infrastructure.adapter.out.persistence.repository;

import com.autocare360.vehiculo.infrastructure.adapter.out.persistence.entity.VehiculoJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpringDataVehiculoRepository extends JpaRepository<VehiculoJpaEntity, Long> {
    Optional<VehiculoJpaEntity> findByPlaca(String placa);
    List<VehiculoJpaEntity> findByCliente_ClienteId(Long clienteId);
}