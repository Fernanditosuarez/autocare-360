# Modelo Físico v0.1 — AutoCare 360

## 1. Tabla: `cliente`
Propósito: Almacena la información del propietario de los vehículos.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `cliente_id` | `BIGINT` | NO | PK | Diseño |
| `nombre_completo` | `VARCHAR(150)` | NO | — | RF-05, RF-15 |
| `documento_identidad` | `VARCHAR(30)` | NO | UQ (`uk_cliente_documento`) | RN-01, RF-15 |
| `correo_electronico` | `VARCHAR(150)` | NO | UQ (`uk_cliente_correo`) | RF-05, RF-15 |
| `telefono` | `VARCHAR(20)` | SÍ | — | RF-05 |
| `direccion` | `TEXT` | SÍ | — | RF-05 |
| `created_at` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | Auditoría |

---

## 2. Tabla: `vehiculo`
Propósito: Representa los automóviles registrados que ingresan al taller.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `vehiculo_id` | `BIGINT` | NO | PK | Diseño |
| `cliente_id` | `BIGINT` | NO | FK (`cliente.cliente_id`) | RN-01 |
| `placa` | `VARCHAR(20)` | NO | UQ (`uk_vehiculo_placa`) | RN-01, RF-15 |
| `vin` | `VARCHAR(17)` | NO | UQ (`uk_vehiculo_vin`) | RN-01, RF-15 |
| `marca` | `VARCHAR(50)` | NO | — | RF-06 |
| `modelo` | `VARCHAR(50)` | NO | — | RF-06 |
| `anio` | `INTEGER` | NO | CK (`anio >= 1900`) | RF-06 |
| `color` | `VARCHAR(30)` | NO | — | RF-06 |
| `kilometraje_actual` | `INTEGER` | NO | CK (`kilometraje_actual >= 0`) | RF-06 |
| `created_at` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | Auditoría |

---

## 3. Tabla: `servicio_catalogo`
Propósito: Catálogo maestro de mantenimientos y reparaciones ofrecidas.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `servicio_catalogo_id` | `BIGINT` | NO | PK | Diseño |
| `codigo_servicio` | `VARCHAR(30)` | NO | UQ (`uk_servicio_codigo`) | RF-07 |
| `nombre` | `VARCHAR(100)` | NO | — | RF-07 |
| `descripcion` | `TEXT` | SÍ | — | RF-07 |
| `precio_referencia` | `NUMERIC(12,2)` | NO | CK (`precio_referencia >= 0`) | RF-07 |
| `tiempo_estimado_minutos`| `INTEGER` | NO | CK (`tiempo_estimado_minutos > 0`) | RF-07 |

---

## 4. Tabla: `orden_servicio`
Propósito: Registro principal que controla el ciclo de atención del vehículo.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `orden_servicio_id` | `BIGINT` | NO | PK | Diseño |
| `vehiculo_id` | `BIGINT` | NO | FK (`vehiculo.vehiculo_id`) | RN-03 |
| `numero_orden` | `VARCHAR(30)` | NO | UQ (`uk_orden_numero`) | RF-08, RF-16 |
| `fecha_recepcion` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | RF-08 |
| `fecha_entrega_real` | `TIMESTAMPTZ` | SÍ | — | RN-07, RF-12 |
| `kilometraje_ingreso` | `INTEGER` | NO | CK (`kilometraje_ingreso >= 0`) | RF-08 |
| `kilometraje_salida` | `INTEGER` | SÍ | CK (`kilometraje_salida >= kilometraje_ingreso`) | RN-07, RF-12 |
| `observaciones_entrega` | `TEXT` | SÍ | — | RN-07, RF-12 |
| `estado_actual` | `VARCHAR(30)` | NO | CK (`estado_actual IN ('ABIERTA','DIAGNOSTICO','ESPERA_APROBACION','EN_TRABAJO','LISTA_ENTREGA','ENTREGADA','CANCELADA')`) | RN-02, RF-16 |

### Regla transaccional que NO se resuelve con constraint simple
- **RN-03 (Orden activa única):** Un vehículo no puede tener dos órdenes en estado activo a la vez. Requiere validación transaccional en el Backend o un índice parcial en PostgreSQL.
- **RN-07 (Condición de entrega):** Para pasar a `ENTREGADA`, todas sus tareas asociadas deben estar en `COMPLETADA`. Se valida en el Backend antes de actualizar el estado.

---

## 5. Tabla: `tarea_orden`
Propósito: Actividad técnica individual ejecutada por un mecánico/técnico.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `tarea_orden_id` | `BIGINT` | NO | PK | Diseño |
| `orden_servicio_id` | `BIGINT` | NO | FK (`orden_servicio.orden_servicio_id`) | RN-06 |
| `descripcion_tarea` | `TEXT` | NO | — | RN-06, RF-09 |
| `estado_tarea` | `VARCHAR(20)` | NO | CK (`estado_tarea IN ('PENDIENTE','EN_PROCESO','COMPLETADA')`) | RN-06, RF-18 |
| `fecha_asignacion` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | RF-09 |
| `fecha_finalizacion` | `TIMESTAMPTZ` | SÍ | — | RN-06, RF-18 |

---

## 6. Tabla: `estimacion`
Propósito: Presupuesto de costos versionado antes de la autorización del cliente.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `estimacion_id` | `BIGINT` | NO | PK | Diseño |
| `orden_servicio_id` | `BIGINT` | NO | FK (`orden_servicio.orden_servicio_id`) | RN-04 |
| `version` | `INTEGER` | NO | UQ Compuesta (`orden_servicio_id`, `version`) | RN-04, RF-10 |
| `fecha_creacion` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | RF-10 |
| `monto_total_estimado` | `NUMERIC(12,2)` | NO | CK (`monto_total_estimado >= 0`) | RN-04 |
| `estado_estimacion` | `VARCHAR(20)` | NO | CK (`estado_estimacion IN ('BORRADOR','ENVIADA','APROBADA','RECHAZADA')`) | RN-04, RN-05 |

---

## 7. Tabla: `item_estimacion`
Propósito: Desglose individual de cada servicio cotizado o repuesto (Mano de obra / Repuestos).

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `item_estimacion_id` | `BIGINT` | NO | PK | Diseño |
| `estimacion_id` | `BIGINT` | NO | FK (`estimacion.estimacion_id`) | RN-04 |
| `servicio_catalogo_id` | `BIGINT` | SÍ | FK (`servicio_catalogo.servicio_catalogo_id`) | RN-04 |
| `tipo_item` | `VARCHAR(20)` | NO | CK (`tipo_item IN ('SERVICIO','REPUESTO')`) | RN-04 |
| `descripcion` | `VARCHAR(150)` | NO | — | RN-04 |
| `cantidad` | `INTEGER` | NO | CK (`cantidad > 0`) | RN-04 |
| `costo_unitario` | `NUMERIC(12,2)` | NO | CK (`costo_unitario >= 0`) | RN-04 |
| `subtotal` | `NUMERIC(12,2)` | NO | CK (`subtotal >= 0`) | RN-04 |

---

## 8. Tabla: `aprobacion_cliente`
Propósito: Evidencia formal de la decisión del cliente sobre una versión de estimación.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `aprobacion_cliente_id` | `BIGINT` | NO | PK | Diseño |
| `estimacion_id` | `BIGINT` | NO | FK (`estimacion.estimacion_id`), UQ (`uk_aprobacion_estimacion`) | RN-05, RF-17 |
| `decision` | `VARCHAR(20)` | NO | CK (`decision IN ('APROBADO','RECHAZADO')`) | RN-05, RF-17 |
| `fecha_hora_respuesta` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | RN-05, RF-17 |
| `comentario_cliente` | `TEXT` | SÍ | — | RN-05, RF-17 |

---

## 9. Tabla: `evidencia`
Propósito: Fotografías y notas que respaldan el diagnóstico o trabajo realizado.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `evidencia_id` | `BIGINT` | NO | PK | Diseño |
| `orden_servicio_id` | `BIGINT` | NO | FK (`orden_servicio.orden_servicio_id`) | RN-08 |
| `ruta_archivo_imagen` | `VARCHAR(255)` | NO | — | RN-08, RF-11 |
| `descripcion` | `TEXT` | NO | — | RN-08, RF-11 |
| `fecha_carga` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | RF-11 |

---

## 10. Tabla: `historial_estado_orden`
Propósito: Registro inmutable de transiciones de estado de una orden de servicio.

| Columna | Tipo candidato | NULL | Rol / Restricción | Fuente |
|---|---|---|---|---|
| `historial_estado_orden_id` | `BIGINT` | NO | PK | Diseño |
| `orden_servicio_id` | `BIGINT` | NO | FK (`orden_servicio.orden_servicio_id`) | RN-02, RF-20 |
| `estado_anterior` | `VARCHAR(30)` | SÍ | — | RF-20 |
| `estado_nuevo` | `VARCHAR(30)` | NO | — | RF-20 |
| `fecha_hora_cambio` | `TIMESTAMPTZ` | NO | DEFAULT `now()` | RF-20 |
| `observacion` | `TEXT` | SÍ | — | RF-20 |