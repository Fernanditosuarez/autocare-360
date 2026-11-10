# Guía 08 — Estado, Efectos, Asincronía y Hooks Reutilizables (AutoCare 360)

## 1. Taxonomía de Estado y Estado Derivado
- **Estado Fuente:** `clientes` y `vehiculos` provienen del servidor y gestionan la UI principal.
- **Estado Derivado:** `vehiculosFiltrados` se calcula dinámicamente en el tiempo de renderizado a partir de `vehiculos` y `clienteFiltro`, evitando copias obsoletas en `useState`.

## 2. Cancelación Limpia con AbortController
- Se implementó `isAbortError.ts` para capturar la excepción `AbortError` cuando se desmonta un componente o cambia un efecto, evitando actualizar el estado de componentes inactivos.

## 3. Capa de Custom Hooks de Dominio
- `useAsyncList.ts`: Custom Hook genérico reutilizable con `data`, `loading`, `error` y función `reload`.
- `useClientes.ts` y `useVehiculos.ts`: Encapsulan la invocación asíncrona a los servicios sin exponer la lógica de `useEffect` en las páginas.