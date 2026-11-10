# Guía 09 — Componentes Reutilizables, Búsqueda, Filtros, Paginación y Modales (AutoCare 360)

## 1. Arquitectura de Componentes UI Genéricos
- Se crearon componentes desacoplados del dominio en `src/components/ui/`: `Button`, `SearchInput`, `SelectFilter`, `Pagination`, `Modal`, `ConfirmDialog` y `EmptyState`.
- Se reemplazó `window.confirm()` por `ConfirmDialog` accesible basado en el elemento HTML `<dialog>`.

## 2. Filtros Combinados y Estado Derivado
- Búsqueda en tiempo real por texto multitermino en clientes y vehículos.
- Filtros por cliente propietario y tipo de vehículo calculados en tiempo de renderizado mediante `filter()`.
- Reinicio automático de página a `1` mediante `useEffect` cuando cambian los criterios de búsqueda.

## 3. Paginación en Cliente
- Paginación dinámica mediante `slice(start, end)` y cálculo de `totalPages` con `Math.ceil()`.
- Estado accesible con controles Anterior / Siguiente deshabilitados en límites.