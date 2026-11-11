# Guía 07 Móvil — Conexión HTTP Asíncrona, useEffect y Backend Spring Boot

## 1. Configuración de Red Móvil (`src/services/api.ts`)
- Configuración de la dirección IP de loopback del emulador Android (`10.0.2.2:8080`) para conectar con Spring Boot local.
- Creación de wrapper HTTP genérico con `fetch` para peticiones REST (`GET`, `POST`, `PUT`, `DELETE`).

## 2. Ciclo de Vida y Asincronía (`src/state/ParkingContext.tsx`)
- Integración del hook `useEffect` para solicitar datos remotos al iniciar la app.
- Control de estados de carga (`ActivityIndicator`) y desacoplamiento defensivo (modo local en memoria si la API no responde).

## 3. Resiliencia y UX en React Native
- Banner informativo de estado de red en la pantalla de Inicio con opción de reintento manual.
