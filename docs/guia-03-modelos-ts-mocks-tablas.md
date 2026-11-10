# Guía 03 — Modelos TypeScript, Datos Mock y Tablas (AutoCare 360)

## 1. Alineación de Modelos con el Backend
- Se definieron las interfaces `Cliente` y `Vehiculo` en TypeScript con nombres y tipos idénticos a los DTOs de Spring Boot (`clienteId`, `nombreCompleto`, `documentoIdentidad`, `placa`, `tipo`).
- Se tipó el enum de dominio `TipoVehiculo: 'AUTO' | 'MOTO' | 'CAMIONETA' | 'SUV'`.

## 2. Datos Simulados (Mocks)
- Se crearon `mockClientes.ts` y `mockVehiculos.ts` para posibilitar el diseño de componentes y vistas sin dependencia inmediata del backend activo.

## 3. Componentes de Tabla y Buenas Prácticas
- **Props fuertemente tipadas:** Componentes declarados recibiendo arrays tipados.
- **Empty State:** Condición que renderiza un mensaje amigable cuando la lista está vacía.
- **Badges visuales:** Función de mapeo de estilos para categorizar el tipo de vehículo por color.
- **Relación 1:N reflejada en UI:** La tabla de vehículos proyecta el nombre y código del cliente propietario asociado.