# Capítulo 02 - Java 21: Contratos, Colecciones y Errores Controlados

## 1. Entidades del Dominio
- **Entidad padre:** `Cliente`
- **Entidad dependiente:** `Vehiculo`
- **Relación:** 1:N (Un cliente posee varios vehículos)

## 2. Decisiones Técnicas
- **Colección elegida:** Se utilizó `LinkedHashMap` en `ClienteRepositoryEnMemoria` para permitir búsqueda directa por ID O(1) y mantener orden de inserción.
- **Uso de Optional:** El método `buscarPorId(Long id)` retorna `Optional<Cliente>` para evidenciar que el resultado puede no existir sin recurrir a retornos nulos.
- **Excepciones de negocio:**
    - `ClienteNoEncontradoException`: Disparada cuando un ID buscado no existe en el repositorio.
    - `DocumentoIdentidadDuplicadoException`: Disparada cuando se intenta registrar un cliente cuyo documento de identidad ya está registrado.
- **Inversión de Dependencias:** `ClienteService` depende exclusivamente de la interfaz `ClienteRepository`, no de la implementación en memoria.
- **Record:** Se creó `RegistrarVehiculoCommand` como estructura inmutable para la operación de registro de vehículos.