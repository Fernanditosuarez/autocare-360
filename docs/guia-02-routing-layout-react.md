# Guía 02 — Routing, Layout Principal y Menú con React Router (AutoCare 360)

## 1. Justificación Técnica
- **Librería utilizada:** `react-router-dom` v6 para navegación SPA en el cliente sin recargas completas del navegador.
- **Patrón Layout + Outlet:** `MainLayout` mantiene estables la barra lateral y la cabecera, mientras `<Outlet />` renderiza dinámicamente cada vista.
- **Navegación con `NavLink`:** Estilos dinámicos basados en `isActive` para resaltar visualmente la sección activa.
- **Ruta Comodín (404):** `path="*"` conectado a `NotFoundPage` para interceptar URLs inválidas.

## 2. Mapa de Rutas Configurado
| Ruta | Componente | Propósito |
|---|---|---|
| `/` | `DashboardPage` | Resumen general del taller |
| `/clientes` | `ClientesPage` | Gestión y listado de clientes |
| `/vehiculos` | `VehiculosPage` | Registro y control de vehículos |
| `/configuracion` | `ConfiguracionPage` | Parámetros del sistema |
| `*` | `NotFoundPage` | Captura de errores 404 |