# Capítulo 07 — Relación 1:N entre Módulos en Arquitectura Hexagonal (AutoCare 360)

## 1. Relación del Negocio y Física
- **Módulo Padre (1):** `cliente` (`com.autocare360.cliente`)
- **Módulo Dependiente (N):** `vehiculo` (`com.autocare360.vehiculo`)
- **FK en PostgreSQL:** `vehiculo.cliente_id -> cliente.cliente_id`
- **Restricción UNIQUE:** `vehiculo.placa` (clave natural del vehículo)
- **Dominio cerrado:** `TipoVehiculo` (`AUTO`, `MOTO`, `CAMIONETA`, `SUV`)

## 2. Decisión Arquitectónica y Desacoplamiento
- **Dominio Puro:** `Vehiculo.java` conserva únicamente el identificador numérico `Long clienteId` sin importar anotaciones JPA ni clases de entidad externa.
- **Colaboración entre Módulos:** `VehiculoService` valida la existencia del cliente invocando el puerto público `ConsultarClienteUseCase` del módulo cliente. Nunca inyecta directamente el repositorio de persistencia `SpringDataClienteRepository`.
- **Mapeo JPA:** `VehiculoJpaEntity` implementa la relación con `@ManyToOne(fetch = FetchType.LAZY, optional = false)` y `@JoinColumn(name = "cliente_id")`.
- **Referencia Eficiente:** `VehiculoPersistenceAdapter` usa `clienteRepository.getReferenceById(clienteId)` para no disparar un SELECT adicional a la tabla `cliente` al persistir el vehículo.

## 3. Comprobación SQL de Integridad Relacional
Consulta ejecutada para verificar la coherencia entre padre e hijos:
```sql
SELECT v.vehiculo_id, v.placa, v.tipo, v.marca, v.modelo, c.cliente_id, c.nombre_completo, c.documento_identidad
FROM public.vehiculo v
INNER JOIN public.cliente c ON c.cliente_id = v.cliente_id
ORDER BY v.vehiculo_id;