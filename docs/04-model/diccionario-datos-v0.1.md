# Diccionario de Datos v0.1 — AutoCare 360

## 1. Tabla: `cliente`
| Campo | Significado | Obligatorio | Rol | Dominio / Regla | Origen |
|---|---|---|---|---|---|
| `cliente_id` | Identificador único técnico del cliente | Sí | PK | Entero positivo incremental | Estructural |
| `nombre_completo` | Nombre y apellido del propietario | Sí | NN | Texto sin números | RF-05, RF-15 |
| `documento_identidad` | Cédula o nit de identidad oficial | Sí | NN, UQ | Texto único sin duplicados | RN-01, RF-15 |
| `correo_electronico` | Correo de contacto y acceso | Sí | NN, UQ | Formato email único | RF-05, RF-15 |
| `telefono` | Número telefónico de contacto | No | NULL | Formato telefónico | RF-05 |
| `direccion` | Dirección domiciliaria del cliente | No | NULL | Texto libre | RF-05 |

## 2. Tabla: `vehiculo`
| Campo | Significado | Obligatorio | Rol | Dominio / Regla | Origen |
|---|---|---|---|---|---|
| `vehiculo_id` | Identificador único técnico del vehículo | Sí | PK | Entero positivo incremental | Estructural |
| `cliente_id` | Propietario del automóvil | Sí | FK | Referencia válida a `cliente.cliente_id` | RN-01 |
| `placa` | Placa oficial de circulación | Sí | NN, UQ | Unicidad global (RF-15) | RN-01, RF-15 |
| `vin` | Número de chasis/identificación vehicular | Sí | NN, UQ | 17 caracteres alfanuméricos únicos | RN-01, RF-15 |
| `marca` | Marca del automóvil | Sí | NN | Texto | RF-06 |
| `modelo` | Modelo específico del vehículo | Sí | NN | Texto | RF-06 |
| `anio` | Año de fabricación | Sí | NN | Año válido (1900..Año actual + 1) | RF-06 |
| `color` | Color del vehículo | Sí | NN | Texto | RF-06 |
| `kilometraje_actual` | Último kilometraje registrado | Sí | NN | Entero >= 0 | RF-06 |

## 3. Tabla: `orden_servicio`
| Campo | Significado | Obligatorio | Rol | Dominio / Regla | Origen |
|---|---|---|---|---|---|
| `orden_servicio_id` | Identificador único de la orden | Sí | PK | Entero positivo incremental | Estructural |
| `vehiculo_id` | Vehículo atendido | Sí | FK | Referencia válida a `vehiculo.vehiculo_id` | RN-03 |
| `numero_orden` | Código secuencial visible de orden | Sí | NN, UQ | Formato `ORD-YYYYMMDD-XXXX` | RF-08, RF-16 |
| `fecha_recepcion` | Fecha y hora de ingreso al taller | Sí | NN | Instante temporal (`now()`) | RF-08 |
| `fecha_entrega_real` | Fecha y hora de entrega efectiva | No | NULL | Requerido solo cuando estado = `ENTREGADA` | RN-07, RF-12 |
| `kilometraje_ingreso` | Kilometraje al recibir el auto | Sí | NN | Entero >= kilometraje actual | RF-08 |
| `kilometraje_salida` | Kilometraje al entregar el auto | No | NULL | Entero >= `kilometraje_ingreso` | RN-07, RF-12 |
| `observaciones_entrega` | Notas finales de cierre de orden | No | NULL | Texto explicativo | RN-07, RF-12 |
| `estado_actual` | Estado dentro del flujo | Sí | NN | `ABIERTA`, `DIAGNOSTICO`, `ESPERA_APROBACION`, `EN_TRABAJO`, `LISTA_ENTREGA`, `ENTREGADA`, `CANCELADA` | RN-02, RF-16 |

## 4. Tabla: `tarea_orden`
| Campo | Significado | Obligatorio | Rol | Dominio / Regla | Origen |
|---|---|---|---|---|---|
| `tarea_orden_id` | Identificador único de tarea | Sí | PK | Entero positivo incremental | Estructural |
| `orden_servicio_id` | Orden a la que pertenece la tarea | Sí | FK | Referencia a `orden_servicio.orden_servicio_id` | RN-06 |
| `descripcion_tarea` | Detalle del trabajo técnico | Sí | NN | Texto descriptivo no vacío | RN-06, RF-09 |
| `estado_tarea` | Estado de la actividad | Sí | NN | `PENDIENTE`, `EN_PROCESO`, `COMPLETADA` | RN-06, RF-18 |
| `fecha_asignacion` | Momento de asignación | Sí | NN | Instante temporal | RF-09 |
| `fecha_finalizacion` | Momento de cierre de la tarea | No | NULL | Requerido si estado = `COMPLETADA` | RN-06, RF-18 |

## 5. Tabla: `estimacion`
| Campo | Significado | Obligatorio | Rol | Dominio / Regla | Origen |
|---|---|---|---|---|---|
| `estimacion_id` | Identificador único de estimación | Sí | PK | Entero positivo incremental | Estructural |
| `orden_servicio_id` | Orden asociada | Sí | FK | Referencia a `orden_servicio.orden_servicio_id` | RN-04 |
| `version` | Número correlativo de versión | Sí | NN, UQ | Entero incremental por orden (1, 2, 3...) | RN-04, RF-10 |
| `fecha_creacion` | Momento de generación | Sí | NN | Instante temporal | RF-10 |
| `monto_total_estimado` | Suma de todos los ítems | Sí | NN | Numérico >= 0 | RN-04 |
| `estado_estimacion` | Situación del presupuesto | Sí | NN | `BORRADOR`, `ENVIADA`, `APROBADA`, `RECHAZADA` | RN-04, RN-05 |