# Guía 02 Móvil — Arquitectura Modular, Componentes, Props y Estilos

## 1. Estructura Modular (`src/`)
- Desacoplamiento de `App.tsx` organizando carpetas por responsabilidad: `models`, `data`, `theme` y `components`.
- Creación de interfaces TypeScript inmutables para `Cliente` y `Vehiculo` respetando la relación 1:N por `clienteId`.

## 2. Componentes Reutilizables y Props
- **MetricCard**: Tarjeta de métricas e indicadores numéricos.
- **TabSelector**: Control accesible para alternar vistas (`clientes` / `vehiculos`).
- **ClienteCard** y **VehiculoCard**: Presentación de registros de dominio con tipado estricto.
- **EmptyState**: Mensaje de retroalimentación para listas vacías.

## 3. Manejo de Estado Local y Estado Derivado
- Elevación del estado (*Lifting State Up*) en `App.tsx` mediante `useState` para `seccion` y `clienteId`.
- Cálculo de estado derivado con `find()` y `filter()` para relacionar vehículos por cliente sin duplicar memoria.
