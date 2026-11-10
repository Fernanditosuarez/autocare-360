# Guía 04 — Formularios con Validación en React y TypeScript (AutoCare 360)

## 1. Patrón de Componentes Controlados
- Se separaron los modelos de datos de entrada (`ClienteFormData`, `VehiculoFormData`) de los tipos del dominio.
- El estado local `useState` almacena en todo momento los valores activos de los campos.

## 2. Validaciones Puras en TypeScript
- Se implementaron las funciones `validarCliente` y `validarVehiculo` que retornan un objeto de errores sin dependencias externas.
- Validación de campos requeridos, longitud de documento de identidad y formato de correo electrónico.

## 3. Representación de la Relación 1:N
- `VehiculoForm` implementa un selector controlado `<select>` poblado dinámicamente con los clientes del sistema, garantizando que todo vehículo quede asociado a un `clienteId` válido.
- Normalización automática de placas a mayúsculas antes de emitir el payload.