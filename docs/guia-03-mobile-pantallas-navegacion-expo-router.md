# Guía 03 Móvil — Pantallas y Navegación Profesional con Expo Router

## 1. Arquitectura de Navegación por Archivos (File-based Routing)
- Configuración de Expo Router con directorio raíz en `src/app/`.
- Definición de pila de navegación (`Stack Navigator`) en `src/app/_layout.tsx` con colores de cabecera y títulos nativos.

## 2. Rutas Dinámicas y Parámetros
- Implementación de pantallas parametrizadas (`clientes/[id].tsx` y `vehiculos/[id].tsx`) para fichas de detalle.
- Uso del hook `useLocalSearchParams` y la utilidad `leerIdPositivo` para validación defensiva de parámetros de URL.

## 3. Navegación Declarativa y Manejo de Errores
- Reutilización de componentes `Link` y `ReturnButton` para navegación accesible y soporte del botón nativo Volver.
- Definición de pantalla de fallback 404 en `src/app/+not-found.tsx`.
