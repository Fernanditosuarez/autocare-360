# AutoCare 360 — Frontend Web (Guía 01)

## 1. Stack Tecnológico
- **Framework:** React 18+
- **Lenguaje:** TypeScript
- **Bundler y Servidor de Desarrollo:** Vite
- **Arquitectura:** Feature-Based (orientada a módulos de negocio)

## 2. Justificación de la Estructura de Carpetas
1. `src/app/`: Contiene el componente raíz `App.tsx` que orquestará la navegación global.
2. `src/features/`: Módulos verticales del negocio (`clientes` y `vehiculos`), aislando sus componentes, páginas, tipos y servicios.
3. `src/components/common/`: Componentes reutilizables transversalmente (botones, inputs genéricos, modales).
4. `src/services/http/`: Cliente HTTP centralizado para comunicarse con los endpoints de Spring Boot.
5. `src/types/`: Definiciones e interfaces globales de TypeScript compartidas en toda la aplicación.

## 3. Comandos de Ejecución
- Iniciar en desarrollo: `npm run dev`
- Compilación de producción: `npm run build`