# Guía 04 Móvil — Formularios, Entradas de Datos y Validaciones

## 1. Reglas de Validación Puras (`src/domain/validaciones.ts`)
- Desacoplamiento de reglas de negocio para validar campos obligatorios, selección de propietario y formato de placa (`SCZ-1234`).
- Función de normalización `normalizarPlaca` para estandarizar entradas a mayúsculas.

## 2. Formulario Controlado (`src/components/VehicleForm.tsx`)
- Captura de datos con componentes nativos `<TextInput>` y selección accesible mediante `<Pressable>`.
- Estado de errores por campo y prevención de envío sin corrección de fallos.

## 3. Integración en Ruta Móvil (`src/app/vehiculos/nuevo.tsx`)
- Registro de ruta en la pila de Expo Router y navegación fluida desde la lista general de vehículos.
