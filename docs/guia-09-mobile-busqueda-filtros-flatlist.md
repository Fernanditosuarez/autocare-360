# Guía 09 Móvil — Búsqueda en Tiempo Real, Filtros Interactivos y Optimización de Listas

## 1. Búsqueda y Filtros en Tiempo Real
- Creación del componente reutilizable `SearchBar.tsx` con limpieza instantánea (`✕`).
- Filtrado por coincidencia de texto (nombre/correo en Clientes y placa/marca/modelo en Vehículos).
- Selección mediante chips interactivos para filtrar por estado (`TODOS`, `ACTIVOS`, `INACTIVOS`) y por propietario.

## 2. Optimización de Renderizado (`FlatList`)
- Configuración de parámetros de rendimiento en Android: `initialNumToRender`, `maxToRenderPerBatch`, `windowSize` y `removeClippedSubviews`.
- Mantenimiento de tasa de refresco fluida (60 FPS) al desplazar colecciones.
