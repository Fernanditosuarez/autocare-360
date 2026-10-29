# Plan de Migración V1 — AutoCare 360

## 1. Objetivo
Establecer la secuencia ordenada de creación de las 10 tablas físicas núcleo que soportan el flujo crítico completo:
*Asesor abre orden -> Técnico recibe tareas -> Se genera estimación -> Cliente aprueba desde móvil -> Técnico actualiza trabajo -> Asesor entrega vehículo.*

---

## 2. Orden Estricto de Creación por Dependencias (Claves Foráneas)

1. **`cliente`** (Tabla raíz sin dependencias de claves foráneas).
2. **`servicio_catalogo`** (Tabla raíz catálogo maestro sin dependencias).
3. **`vehiculo`** (Depende de `cliente` mediante `cliente_id`).
4. **`orden_servicio`** (Depende de `vehiculo` mediante `vehiculo_id`).
5. **`tarea_orden`** (Depende de `orden_servicio` mediante `orden_servicio_id`).
6. **`estimacion`** (Depende de `orden_servicio` mediante `orden_servicio_id`).
7. **`item_estimacion`** (Depende de `estimacion` mediante `estimacion_id` y opcionalmente de `servicio_catalogo`).
8. **`aprobacion_cliente`** (Depende de `estimacion` mediante `estimacion_id`).
9. **`evidencia`** (Depende de `orden_servicio` mediante `orden_servicio_id`).
10. **`historial_estado_orden`** (Depende de `orden_servicio` mediante `orden_servicio_id`).

---

## 3. Restricciones Previstas en V1
- **PKs:** Tipo `BIGINT GENERATED ALWAYS AS IDENTITY`.
- **FKs:** Con reglas por defecto para evitar borrados accidentales de datos con historial (`ON DELETE RESTRICT`).
- **UNIQUEs:** Placa, VIN, Documento de identidad, Correo, Código de Servicio, Número de Orden, e (`orden_servicio_id`, `version`).
- **CHECKs:** Importes y precios `>= 0`, cantidades `> 0`, listas cerradas de estados permitidos y coherencia de kilometraje (`kilometraje_salida >= kilometraje_ingreso`).

---

## 4. Reglas que Requerirán Lógica Posterior (Backend / Triggers)
- **RN-03:** Garantizar una sola orden activa por vehículo a la vez.
- **RN-07:** Exigir que todas las tareas estén en estado `COMPLETADA` antes de autorizar el cambio de estado a `ENTREGADA`.
- **Spring AI:** Asistente probabilístico de estructuración de tareas que debe requerir confirmación humana antes de insertarse en `tarea_orden`.

---

## 5. Fuera de V1
- Notificaciones automáticas push/email.
- Vistas de reportes agregados e indicadores globales del taller.

---

## 6. Criterio de Salida
Podemos proceder a escribir las sentencias DDL en la Clase 06 sin tomar decisiones de diseño ambiguas o pendientes.