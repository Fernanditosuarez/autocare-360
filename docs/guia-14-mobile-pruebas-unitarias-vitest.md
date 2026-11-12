# Guía 14 Móvil — Pruebas Automatizadas con Vitest, TypeScript y Diagnóstico

## 1. Suite de Pruebas Unitarias (`tests/rules.test.ts`)
- Configuración de Vitest para pruebas de lógica pura de dominio.
- Pruebas automatizadas de validación de correo electrónico, formato de placas y cálculo de promedios de métricas.

## 2. Diagnóstico de Salud y Control de Calidad
- Ejecución limpia de `npx vitest run` (3 tests pasados).
- Verificación estática estricta con `npx tsc --noEmit` (0 errores de tipos).
- Auditoría de dependencias con `npx expo-doctor`.
