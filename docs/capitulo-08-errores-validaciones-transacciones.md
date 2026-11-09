# Capítulo 08 — Errores Profesionales, Validaciones y Transacciones (AutoCare 360)

## 1. Contrato Único de Error (`ApiError`)
Se estandarizó la respuesta de error de toda la API mediante el `record ApiError`:
- `timestamp`: Momento exacto del error (ISO-8601).
- `status`: Código numérico HTTP (400, 404, 409, 500).
- `error`: Nombre estándar del estado HTTP.
- `message`: Explicación clara y segura orientada al usuario o cliente API.
- `path`: Endpoint URI donde se originó el error.
- `fieldErrors`: Mapa `campo -> mensaje` que detalla los fallos específicos cuando ocurre un `400 Bad Request`.

## 2. Separación de Responsabilidades en Validaciones
- **Validaciones de Formato / Entrada:** Declaradas con Bean Validation (`@NotBlank`, `@NotNull`, `@Size`) en los Records Request (`CrearClienteRequest`, `CrearVehiculoRequest`). Si fallan, Spring lanza `MethodArgumentNotValidException` y el manejador devuelve **400 Bad Request**.
- **Validaciones de Existencia y Negocio:** Validadas en los Application Services (`ClienteService`, `VehiculoService`). Si el cliente padre no existe, se lanza `ClienteNoEncontradoException` (**404 Not Found**). Si la placa o documento ya existen, se lanza `VehiculoDuplicadoException` o `ClienteDuplicadoException` (**409 Conflict**).
- **Controladores Limpios:** Los controladores web no tienen bloques `try/catch`. La captura y transformación a JSON la realiza centralizadamente `@RestControllerAdvice` con `GlobalExceptionHandler`.

## 3. Uso Justificado de `@Transactional`
- Se aplicó `@Transactional` sobre los métodos `registrar` de `VehiculoService` y `ClienteService`.
- **Justificación:** Garantiza atomicidad en las operaciones de escritura contra PostgreSQL. Si falla una validación de negocio o se produce una excepción en el guardado, la transacción revierte automáticamente evitando inconsistencias o registros huérfanos.
- Se configuró `@Transactional(readOnly = true)` en los métodos de consulta para optimizar el rendimiento y evitar bloqueos innecesarios en la base de datos.