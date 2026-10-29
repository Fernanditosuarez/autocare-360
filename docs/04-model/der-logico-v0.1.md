# DER Lógico v0.1 — AutoCare 360

## Convenciones
- **PK**: Clave Primaria (Primary Key)
- **FK**: Clave Foránea (Foreign Key)
- **UQ**: Restricción de Unicidad (Unique)
- **NN**: Campo Obligatorio (Not Null)
- **NULL**: Campo Opcional

---

## Estructura de Tablas Lógicas

### `cliente`
- **PK**: `cliente_id`
- **NN**: `nombre_completo`, `documento_identidad`, `correo_electronico`
- **NULL**: `telefono`, `direccion`
- **UQ**: `documento_identidad`, `correo_electronico`

### `vehiculo`
- **PK**: `vehiculo_id`
- **FK**: `cliente_id` -> `cliente.cliente_id` [NN]
- **NN**: `placa`, `vin`, `marca`, `modelo`, `anio`, `color`, `kilometraje_actual`
- **UQ**: `placa`, `vin`

### `servicio_catalogo`
- **PK**: `servicio_catalogo_id`
- **NN**: `codigo_servicio`, `nombre`, `precio_referencia`, `tiempo_estimado_minutos`
- **NULL**: `descripcion`
- **UQ**: `codigo_servicio`

### `orden_servicio`
- **PK**: `orden_servicio_id`
- **FK**: `vehiculo_id` -> `vehiculo.vehiculo_id` [NN]
- **NN**: `numero_orden`, `fecha_recepcion`, `kilometraje_ingreso`, `estado_actual`
- **NULL**: `fecha_entrega_real`, `kilometraje_salida`, `observaciones_entrega`
- **UQ**: `numero_orden`

### `tarea_orden`
- **PK**: `tarea_orden_id`
- **FK**: `orden_servicio_id` -> `orden_servicio.orden_servicio_id` [NN]
- **NN**: `descripcion_tarea`, `estado_tarea`, `fecha_asignacion`
- **NULL**: `fecha_finalizacion`, `tecnico_asignado_id`

### `estimacion`
- **PK**: `estimacion_id`
- **FK**: `orden_servicio_id` -> `orden_servicio.orden_servicio_id` [NN]
- **NN**: `version`, `fecha_creacion`, `monto_total_estimado`, `estado_estimacion`
- **UQ**: (`orden_servicio_id`, `version`)

### `item_estimacion`
- **PK**: `item_estimacion_id`
- **FK**:
    - `estimacion_id` -> `estimacion.estimacion_id` [NN]
    - `servicio_catalogo_id` -> `servicio_catalogo.servicio_catalogo_id` [NULL]
- **NN**: `tipo_item`, `descripcion`, `cantidad`, `costo_unitario`, `subtotal`

### `aprobacion_cliente`
- **PK**: `aprobacion_cliente_id`
- **FK**: `estimacion_id` -> `estimacion.estimacion_id` [NN]
- **NN**: `decision`, `fecha_hora_respuesta`
- **NULL**: `comentario_cliente`
- **UQ**: `estimacion_id`

### `evidencia`
- **PK**: `evidencia_id`
- **FK**: `orden_servicio_id` -> `orden_servicio.orden_servicio_id` [NN]
- **NN**: `ruta_archivo_imagen`, `descripcion`, `fecha_carga`

### `historial_estado_orden`
- **PK**: `historial_estado_orden_id`
- **FK**: `orden_servicio_id` -> `orden_servicio.orden_servicio_id` [NN]
- **NN**: `estado_nuevo`, `fecha_hora_cambio`
- **NULL**: `estado_anterior`, `observacion`

---

## Relaciones Lógicas (1:N)
1. `cliente` (1) ---- (1..*) `vehiculo`
2. `vehiculo` (1) ---- (0..*) `orden_servicio`
3. `orden_servicio` (1) ---- (1..*) `tarea_orden`
4. `orden_servicio` (1) ---- (1..*) `estimacion`
5. `estimacion` (1) ---- (1..*) `item_estimacion`
6. `estimacion` (1) ---- (0..1) `aprobacion_cliente`
7. `orden_servicio` (1) ---- (0..*) `evidencia`
8. `orden_servicio` (1) ---- (1..*) `historial_estado_orden`