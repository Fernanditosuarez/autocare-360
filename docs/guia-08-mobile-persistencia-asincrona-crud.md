# Guía 08 Móvil — Persistencia Asíncrona Completa (Mutaciones REST: POST, PUT, DELETE)

## 1. Operaciones Asíncronas REST en Contexto (`src/state/ParkingContext.tsx`)
- Implementación de `crearCliente`, `editarCliente`, `eliminarCliente`, `crearVehiculo`, `editarVehiculo` y `eliminarVehiculo`.
- Estrategia híbrida resiliente: consumo de endpoints de Spring Boot con fallback a estado local en memoria ante fallos de red.

## 2. Experiencia de Usuario (UX) e Indicadores de Carga
- Bloqueo táctico de botones y modificación de etiquetas de estado (`Guardando en servidor...`, `Eliminando...`) durante peticiones asíncronas.
- Redirección automática coordinada tras confirmación de éxito.
