# Capítulo 04 — Spring MVC, DTOs y Validación (AutoCare 360)

## 1. Contrato HTTP Implementado
| Verbo | Ruta | Entrada | Salida | Status |
|---|---|---|---|---|
| POST | /cliente | JSON `CrearClienteRequest` | `ClienteResponse` | 201 Created / 400 Bad Request |
| GET | /cliente | Query param opcional `buscar` | Lista de `ClienteResponse` | 200 OK |
| GET | /cliente/{id} | Path variable `id` | `ClienteResponse` | 200 OK / 404 Not Found |

## 2. Decisiones de Diseño y DTOs
- **¿Por qué separar Request y Response?** `CrearClienteRequest` no recibe el ID porque es autogenerado y aplica validaciones estrictas (`@NotBlank`, `@Email`, `@Size`). `ClienteResponse` es inmutable y formatea la salida para el cliente.
- **Validación con `@Valid`:** Se asegura que los datos cumplan las restricciones antes de entrar al backend, retornando 400 Bad Request ante datos no conformes.
- **Códigos HTTP semánticos:** Se utiliza `ResponseEntity` para responder con exactitud: 201 para creación, 200 para lecturas exitosas y 404 cuando el recurso buscado no existe.