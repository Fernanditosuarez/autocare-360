# Guía 07 — CRUD Completo de Vehículo y Relación Cliente 1:N (AutoCare 360)

## 1. Operaciones HTTP Implementadas
- **GET `/api/vehiculos`**: Consulta de colecciones de vehículos.
- **GET `/api/vehiculos/{id}`**: Búsqueda individual para edición.
- **POST `/api/vehiculos`**: Registro de nuevo vehículo con asignación de `clienteId`.
- **PUT `/api/vehiculos/{id}`**: Modificación de datos y reasignación de propietario.
- **DELETE `/api/vehiculos/{id}`**: Eliminación física del registro de vehículo.

## 2. Manejo de la Relación 1:N en UI
- **Consulta paralela (`Promise.all`)**: Carga conjunta de colecciones de vehículos y clientes al inicializar la pantalla.
- **Proyección en Tabla**: `VehiculoTable` mapea `clienteId` contra la lista de clientes para mostrar el nombre completo del propietario.
- **Selector controlado**: `VehiculoForm` provee un `<select>` poblado con clientes activos.
- **Filtrado en cliente**: Permite filtrar vehículos por propietario seleccionado en pantalla.