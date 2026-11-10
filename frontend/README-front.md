# AutoCare 360 — Frontend Web (Guía 01)

## 1. Stack Tecnológico
- **Framework:** React 18
- **Lenguaje:** TypeScript
- **Bundler y Servidor:** Vite 5
- **Arquitectura:** Feature-Based (módulos por dominio)

## 2. Justificación de la Estructura de Carpetas
- `src/app/`: Orquestador principal (`App.tsx`).
- `src/features/`: Módulos de negocio aislados (`clientes`, `vehiculos`) con sus propios componentes, páginas, tipos y servicios.
- `src/components/common/`: Componentes transversales reutilizables.
- `src/layouts/`: Plantillas visuales (Sidebar, Header, Outlet).
- `src/routes/`: Configuración central de navegación SPA.