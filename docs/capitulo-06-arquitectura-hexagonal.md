# Capítulo 06 — Arquitectura Hexagonal aplicada a Cliente (AutoCare 360)

## 1. Principio Rector
> "El caso de uso no conoce JPA ni PostgreSQL."

El núcleo del negocio (dominio y aplicación) permanece totalmente aislado de la web (Spring MVC) y de la base de datos (Spring Data JPA / Hibernate).

## 2. Mapa de Puertos y Adaptadores (Módulo Cliente)
```text
PETICIÓN HTTP
   ↓
ADAPTER IN: ClienteController
   ↓
PORT IN: RegistrarClienteUseCase / ConsultarClienteUseCase
   ↓
APPLICATION SERVICE: ClienteService
   ↓
DOMAIN: Cliente (reglas de negocio, ClienteDuplicadoException)
   ↓
PORT OUT: ClienteRepositoryPort
   ↓
ADAPTER OUT: ClientePersistenceAdapter
   ↓
JPA / POSTGRESQL: SpringDataClienteRepository -> ClienteJpaEntity