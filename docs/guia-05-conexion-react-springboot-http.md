# Guía 05 — Conexión React ↔ Spring Boot HTTP (AutoCare 360)

## 1. Configuración de Entorno y CORS
- Se creó `.env.development` con la variable `VITE_API_URL=http://localhost:8080/api`.
- Se configuró la política CORS en Spring Boot para autorizar peticiones HTTP desde `http://localhost:5173`.

## 2. Abstracción del Cliente HTTP
- Se creó `apiClient.ts` utilizando Fetch API nativa con `async`/`await`.
- Manejo centralizado de errores HTTP mediante la clase `ApiError` verificando `response.ok`.

## 3. Capa de Servicios por Módulo
- `clienteService.ts`: operaciones `listar()` (GET `/api/clientes`) y `crear()` (POST `/api/clientes`).
- `vehiculoService.ts`: operaciones `listar()` (GET `/api/vehiculos`) y `crear()` (POST `/api/vehiculos`).

## 4. Gestión de Estados Asíncronos en UI
- Manejo explícito de los estados `loading`, `error` y consulta directa de PostgreSQL.
- Cancelación limpia de peticiones pendientes en el desmontaje con `AbortController`.