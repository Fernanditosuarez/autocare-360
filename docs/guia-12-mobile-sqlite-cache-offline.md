# Guía 12 Móvil — Base de Datos SQLite Local, Caché y Trabajo Sin Conexión (Offline)

## 1. Integración de SQLite Nativo (`src/services/sqlite.ts`)
- Instalación de `expo-sqlite` y creación de la tabla `clientes_cache`.
- Métodos asíncronos de inserción, consulta y limpieza de registros locales.

## 2. Pantalla de Caché y Sincronización (`src/app/offline.tsx`)
- Sincronización manual de registros desde la API REST/estado hacia SQLite.
- Resiliencia de red para consultar datos locales al perder la conexión con el servidor.
