# Guía 06 Móvil — CRUD Completo de Vehículos en Memoria con Context API y Reducer

## 1. Conexión de Alta de Vehículos (`/vehiculos/nuevo`)
- Integración de `VehicleForm` con el proveedor de estado `ParkingContext` mediante la acción `VEHICULO_CREAR`.

## 2. Edición y Eliminación de Automotores
- Creación de ruta parametrizada `/vehiculos/editar/[id]` con soporte para `VEHICULO_EDITAR`.
- Botón de eliminación en la pantalla de detalle (`/vehiculos/[id]`) con diálogo de confirmación nativo `Alert.alert`.

## 3. Sincronización Global
- Actualización instantánea en el catálogo general, la ficha del cliente propietario y las métricas del Dashboard de Inicio.
