# Guía 10 — Integración Final, Dashboard, Testing, Build y Despliegue (AutoCare 360)

## 1. Dashboard Ejecutivo y Estado Derivado
- Implementación de `DashboardPage.tsx` consumiendo los custom hooks `useClientes` y `useVehiculos`.
- Métricas operativas proyectadas mediante `MetricCard.tsx` calculando automotores por categoría (AUTO, MOTO, SUV/CAMIONETA) en tiempo de renderizado sin duplicidad de estado.

## 2. Robustez de UI (Error Boundary)
- Captura global de excepciones de renderizado mediante `AppErrorBoundary.tsx` para prevenir caídas de interfaz.

## 3. Pruebas Unitarias e Integración (Vitest + Testing Library)
- Configuración del motor de pruebas Vitest con entorno `jsdom` en `vitest.config.ts` y setup global en `src/test/setup.ts`.
- Prueba unitaria `MetricCard.test.tsx` ejecutada y aprobada exitosamente (`1 passed`).

## 4. Compilación y Despliegue
- Configuración de variables de entorno con `.env.production`.
- Compilación del bundle estático ejecutable con `npm run build` generando los entregables optimizados en la carpeta `dist/`.