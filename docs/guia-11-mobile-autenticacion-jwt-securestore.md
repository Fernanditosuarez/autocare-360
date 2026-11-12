# Guía 11 Móvil — Autenticación con JWT, Login y Almacenamiento Seguro con SecureStore

## 1. Configuración de SecureStore (`src/services/api.ts`)
- Instalación de `expo-secure-store` e integración del header de autorización `Authorization: Bearer <token>`.
- Funciones para guardar, recuperar y eliminar tokens cifrados en el dispositivo Android.

## 2. Estado Global de Autenticación (`src/state/AuthContext.tsx`)
- Proveedor de contexto `AuthProvider` para gestionar el estado de sesión y token JWT.
- Cierre de sesión y restauración automática al reiniciar la aplicación.

## 3. Pantalla de Login (`src/app/login.tsx`)
- Formulario de inicio de sesión con validación de credenciales y redirección coordinada.
