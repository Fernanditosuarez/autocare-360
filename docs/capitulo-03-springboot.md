# Capítulo 03 - Introducción a Spring Boot (AutoCare 360)

## 1. Justificación de Inyección de Dependencias
- **Inyección por constructor:** Se adoptó como estándar en `ClienteDemoController` y `HealthController`. Permite inmutabilidad (`final`), facilita pruebas unitarias sin levantar el contexto de Spring y detecta dependencias faltantes en tiempo de compilación.
- **Evitamos `@Autowired` sobre campos:** Evita acoplamiento al contenedor de Spring y previene dependencias circulares ocultas.

## 2. Endpoints Implementados
- `GET /api/health`: Monitoreo del backend, retorna estado operativo (`UP`), nombre de la app y timestamp ISO-8601.
- `GET /api/demo/clientes`: Demostración del flujo Web -> Service en memoria con Spring Boot antes de la persistencia real.

## 3. Arquitectura y Paquetes
- `com.autocare360.shared`: Elementos transversales reutilizables (diagnóstico de salud, respuestas comunes).
- `com.autocare360.cliente`: Lógica modular vertical del dominio de clientes del taller.