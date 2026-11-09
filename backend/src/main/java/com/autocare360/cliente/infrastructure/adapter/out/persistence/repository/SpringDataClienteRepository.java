package com.autocare360.cliente.infrastructure.adapter.out.persistence.repository;

import com.autocare360.cliente.infrastructure.adapter.out.persistence.entity.ClienteJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpringDataClienteRepository extends JpaRepository<ClienteJpaEntity, Long> {

    Optional<ClienteJpaEntity> findByDocumentoIdentidad(String documentoIdentidad);
}