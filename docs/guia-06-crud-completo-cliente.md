# Guía 06 — CRUD Completo de Cliente (AutoCare 360)

## 1. Operaciones HTTP Implementadas
- **GET `/api/clientes`**: Consulta de colecciones de clientes.
- **GET `/api/clientes/{id}`**: Búsqueda por identificador para precarga de edición.
- **POST `/api/clientes`**: Creación de nuevos clientes.
- **PUT `/api/clientes/{id}`**: Modificación idempotente de registros.
- **DELETE `/api/clientes/{id}`**: Eliminación física/lógica de registros.

## 2. Separación de Responsabilidades
- `ClienteTable`: Componente puramente presentacional que emite callbacks `onEdit` y `onDelete`.
- `ClienteForm`: Formulario reutilizable que conmuta entre modo Creación y modo Edición según la presencia de `clienteToEdit`.
- `ClientesPage`: Coordinador de estado asíncrono, sincronización local post-HTTP y manejo de confirmaciones/errores de integridad referencial.