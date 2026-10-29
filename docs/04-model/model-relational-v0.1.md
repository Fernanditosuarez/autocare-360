# Modelo Relacional v0.1 — AutoCare 360

## 1. Fuente y Referencia
- **Proyecto asignado:** PA-02 — AutoCare 360.
- **Modelo conceptual base:** `docs/04-model/model-conceptual-v0.1.md`.
- **Flujo crítico considerado:** Asesor abre orden -> Técnico recibe tareas -> Se genera estimación -> Cliente aprueba desde móvil -> Técnico actualiza trabajo -> Asesor entrega vehículo.

---

## 2. Criterios de Transformación Aplicados
1. **Claves Primarias (PK):** Se propone una PK técnica sustituta (`<tabla>_id`) para garantizar estabilidad en las referencias [5, 6].
2. **Relaciones 1:N:** La clave foránea (`FK`) se ubica en la tabla del lado N apuntando a la PK del lado 1 [7, 8].
3. **Relaciones N:M:** Se resuelven mediante tablas puente con atributos propios de la relación (ej. `item_estimacion`) [2, 9].
4. **Claves Naturales / UNIQUE:** Se identifican los atributos únicos del negocio (placa, VIN, número de orden, correo, etc.) protegidos como candidatos a restricción `UNIQUE` [10-12].
5. **Opcionalidad:** Se documenta si la FK es obligatoria o si permite opcionalidad previa al diseño físico [2, 13].

---

## 3. Tablas Candidatas del Núcleo

### 3.1 `cliente`
- **Propósito:** Almacena la información de los propietarios de vehículos [6].
- **Atributos:**
    - `cliente_id` [PK]
    - `nombre_completo`
    - `documento_identidad`
    - `correo_electronico`
    - `telefono`
    - `direccion`
- **Reglas asociadas:** RF-05, RF-15, RN-01 [14-17].

### 3.2 `vehiculo`
- **Propósito:** Representa los automóviles registrados en el taller [6].
- **Atributos:**
    - `vehiculo_id` [PK]
    - `cliente_id` [FK -> `cliente.cliente_id`]
    - `placa`
    - `vin`
    - `marca`
    - `modelo`
    - `anio`
    - `color`
    - `kilometraje_actual`
- **Reglas asociadas:** RF-06, RF-15, RN-01 [15-17].

### 3.3 `servicio_catalogo`
- **Propósito:** Catálogo maestro de mantenimientos y reparaciones ofrecidas con precios e insumos de referencia [6].
- **Atributos:**
    - `servicio_catalogo_id` [PK]
    - `codigo_servicio`
    - `nombre`
    - `descripcion`
    - `precio_referencia`
    - `tiempo_estimado_minutos`
- **Reglas asociadas:** RF-07 [18].

### 3.4 `orden_servicio`
- **Propósito:** Registro principal que controla la recepción, diagnóstico, avance y cierre del vehículo [6].
- **Atributos:**
    - `orden_servicio_id` [PK]
    - `vehiculo_id` [FK -> `vehiculo.vehiculo_id`]
    - `numero_orden`
    - `fecha_recepcion`
    - `fecha_entrega_real`
    - `kilometraje_ingreso`
    - `kilometraje_salida`
    - `observaciones_entrega`
    - `estado_actual`
- **Reglas asociadas:** RF-08, RF-16, RN-02, RN-03, RN-07 [15, 17-19].

### 3.5 `tarea_orden`
- **Propósito:** Actividad técnica específica asignada a un profesional dentro de una orden de servicio [6].
- **Atributos:**
    - `tarea_orden_id` [PK]
    - `orden_servicio_id` [FK -> `orden_servicio.orden_servicio_id`]
    - `descripcion_tarea`
    - `estado_tarea` (`PENDIENTE`, `EN_PROCESO`, `COMPLETADA`)
    - `fecha_asignacion`
    - `fecha_finalizacion`
- **Reglas asociadas:** RF-09, RF-18, RN-06 [17-19].

### 3.6 `estimacion`
- **Propósito:** Presupuesto de costos versionado generado para autorizar trabajos [6].
- **Atributos:**
    - `estimacion_id` [PK]
    - `orden_servicio_id` [FK -> `orden_servicio.orden_servicio_id`]
    - `version`
    - `fecha_creacion`
    - `monto_total_estimado`
    - `estado_estimacion` (`BORRADOR`, `ENVIADA`, `APROBADA`, `RECHAZADA`)
- **Reglas asociadas:** RF-10, RN-04 [18, 19].

### 3.7 `item_estimacion`
- **Propósito:** Desglose individual de servicios cotizados o repuestos incluidos en una versión de estimación (Tabla asociativa/detalle) [6, 9].
- **Atributos:**
    - `item_estimacion_id` [PK]
    - `estimacion_id` [FK -> `estimacion.estimacion_id`]
    - `servicio_catalogo_id` [FK -> `servicio_catalogo.servicio_catalogo_id` - Opcional si es solo repuesto]
    - `tipo_item` (`SERVICIO`, `REPUESTO`)
    - `descripcion`
    - `cantidad`
    - `costo_unitario`
    - `subtotal`
- **Reglas asociadas:** RN-04 [19].

### 3.8 `aprobacion_cliente`
- **Propósito:** Registro formal e inmutable de la respuesta dada por el cliente desde la app móvil [6].
- **Atributos:**
    - `aprobacion_cliente_id` [PK]
    - `estimacion_id` [FK -> `estimacion.estimacion_id`]
    - `decision` (`APROBADO`, `RECHAZADO`)
    - `fecha_hora_respuesta`
    - `comentario_cliente`
- **Reglas asociadas:** RF-17, RN-05 [17, 19].

### 3.9 `evidencia`
- **Propósito:** Fotografías y notas descriptivas adjuntas al proceso de reparación [6].
- **Atributos:**
    - `evidencia_id` [PK]
    - `orden_servicio_id` [FK -> `orden_servicio.orden_servicio_id`]
    - `ruta_archivo_imagen`
    - `descripcion`
    - `fecha_carga`
- **Reglas asociadas:** RF-11, RF-19, RN-08 [17, 19, 20].

### 3.10 `historial_estado_orden`
- **Propósito:** Auditoría inmutable de transiciones de estado de una orden de servicio [6].
- **Atributos:**
    - `historial_estado_orden_id` [PK]
    - `orden_servicio_id` [FK -> `orden_servicio.orden_servicio_id`]
    - `estado_anterior`
    - `estado_nuevo`
    - `fecha_hora_cambio`
    - `observacion`
- **Reglas asociadas:** RF-20, RN-02 [15, 17].

---

## 4. Definición de Relaciones y Ubicación de Claves Foráneas (FK)

| Tabla Origen (1) | Tabla Destino (N) | Clave Foránea (FK) | Frase del Negocio | Regla |
|---|---|---|---|---|
| `cliente` | `vehiculo` | `vehiculo.cliente_id` | Un cliente posee uno o varios vehículos; cada vehículo pertenece a un único propietario. | RN-01 [8, 15] |
| `vehiculo` | `orden_servicio` | `orden_servicio.vehiculo_id` | Un vehículo puede acumular varias órdenes en su historial; cada orden se abre para un vehículo. | RN-03 [8, 19] |
| `orden_servicio` | `tarea_orden` | `tarea_orden.orden_servicio_id` | Una orden de servicio se desgosa en una o varias tareas técnicas. | RN-06 [8, 19] |
| `orden_servicio` | `estimacion` | `estimacion.orden_servicio_id` | Una orden de servicio puede generar varias versiones de estimación. | RN-04 [8, 19] |
| `estimacion` | `item_estimacion` | `item_estimacion.estimacion_id` | Una estimación se compone de uno o varios ítems de costo/repuesto. | RN-04 [8, 19] |
| `estimacion` | `aprobacion_cliente` | `aprobacion_cliente.estimacion_id` | Una estimación enviada recibe una respuesta de aprobación o rechazo. | RN-05 [8, 19] |
| `orden_servicio` | `evidencia` | `evidencia.orden_servicio_id` | Una orden de servicio puede tener asociadas múltiples evidencias fotográficas. | RN-08 [8, 19] |
| `orden_servicio` | `historial_estado_orden` | `historial_estado_orden.orden_servicio_id` | Una orden registra cronológicamente todos sus cambios de estado. | RN-02 [8, 15] |

---

## 5. Resolución de Relaciones N:M (Tablas Puente)

- **`estimacion` N:M `servicio_catalogo` / Repuestos:**
    - *Problema:* Una estimación incluye múltiples servicios/repuestos, y un servicio del catálogo puede ser cotizado en muchas estimaciones de diferentes órdenes [9, 10].
    - *Solución:* Se resuelve mediante la tabla **`item_estimacion`**, la cual almacena atributos propios de la transacción como la `cantidad`, el `costo_unitario` congelado en el tiempo y el `subtotal` [9, 21].

---

## 6. Claves Naturales y Restricciones Candidatas a `UNIQUE`

| Tabla | Campo / Combinación UNIQUE | Justificación / Regla Oficial |
|---|---|---|
| `cliente` | `documento_identidad` | No pueden existir dos clientes registrados con el mismo documento oficial [12, 21]. |
| `cliente` | `correo_electronico` | El correo es identificador único de contacto y acceso [12, 21]. |
| `vehiculo` | `placa` | La placa identifica de forma única al vehículo en el país (RF-15) [12, 17, 21]. |
| `vehiculo` | `vin` | El número de chasis (VIN) es único a nivel mundial (RF-15) [12, 17, 21]. |
| `servicio_catalogo` | `codigo_servicio` | Identificador único del catálogo del taller [12, 21]. |
| `orden_servicio` | `numero_orden` | Código secuencial visible para cliente y taller [12, 21]. |
| `estimacion` | (`orden_servicio_id`, `version`) | No pueden existir dos presupuestos con el mismo número de versión para una misma orden (RN-04) [12, 19, 21]. |

---

## 7. Opcionalidad y Nulabilidad Conceptual

- **`vehiculo.cliente_id` (Obligatorio):** No puede existir un vehículo huérfano sin cliente asignado (RN-01) [13, 15, 22].
- **`orden_servicio.vehiculo_id` (Obligatorio):** Toda orden requiere un vehículo objeto de la atención [13, 22].
- **`orden_servicio.fecha_entrega_real` (Opcional):** Permanece nulo mientras la orden esté abierta, en diagnóstico o en trabajo; se completa obligatoriamente al pasar a `ENTREGADA` (RN-07) [13, 19, 22].
- **`item_estimacion.servicio_catalogo_id` (Opcional):** Puede ser nulo si el ítem corresponde a un repuesto o insumo externo que no proviene del catálogo de servicios estándar [13, 22].
- **`aprobacion_cliente.estimacion_id` (Obligatorio):** La aprobación responde obligatoriamente a una versión concreta de estimación (RN-05) [13, 19, 22].

---

## 8. Revisión de Normalización Básica

1. **Primera Forma Normal (1FN):** Se eliminaron listas de teléfonos o direcciones separadas por comas en `cliente`, y se eliminaron columnas repetitivas como `servicio1`, `servicio2`, `servicio3` en la orden de servicio. Todo se maneja mediante filas individuales en tablas relacionadas (`item_estimacion`, `tarea_orden`) [22, 23].
2. **Segunda Forma Normal (2FN):** En la tabla puente `item_estimacion`, los costos y descripciones dependen exclusivamente de la clave técnica o de la combinación del ítem cotizado [22, 23].
3. **Tercera Forma Normal (3FN) y Congelamiento Histórico:** En `item_estimacion` se guarda explícitamente `costo_unitario`. Aunque existe un `precio_referencia` en `servicio_catalogo`, se guarda el costo negociado para que los presupuestos históricos no se alteren cuando cambie el catálogo en el futuro [22, 23].

---

## 9. Decisiones Pendientes para la Clase 04
- Mapear estas 10 tablas candidatas al Diagrama Entidad-Relación (DER) Lógico completo.
- Elaborar el Diccionario de Datos completo con tipos de datos físicos de PostgreSQL (`BIGINT`, `VARCHAR`, `NUMERIC`, `TIMESTAMPTZ`, `BOOLEAN`).
- Diseñar la estrategia de scripts de migración DDL mediante Flyway en el proyecto Spring Boot.