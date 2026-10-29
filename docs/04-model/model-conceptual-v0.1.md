# Modelo Conceptual v0.1 — AutoCare 360

## 1. Objetivo
Este documento establece el modelo conceptual de información para el sistema **AutoCare 360** [1]. Identifica los conceptos núcleo del dominio, sus atributos conceptuales, relaciones, cardinalidades y las primeras reglas de integridad para dar soporte al ciclo completo de atención en un taller automotriz [1, 2].

> **Frontera técnica de la Clase 02:** Este modelo representa los conceptos del negocio en lenguaje natural. Todavía no contiene sentencias SQL (`CREATE TABLE`), tipos de datos físicos de PostgreSQL ni entidades JPA [3, 4].

---

## 2. Fuente analizada
- **Proyecto asignado:** PA-02 — AutoCare 360 [1].
- **Secciones analizadas de la ficha oficial:** A (Situación), B (Objetivo), C (Actores), D (Alcance), E (Reglas de Negocio), F (Modelo mínimo esperado) y J (Flujo crítico) [1, 2, 5-7].

---

## 3. Candidatos analizados (Inventario conceptual)

| Candidato | Clasificación | Justificación | Fuente en la Ficha |
|---|---|---|---|
| **Cliente** | Entidad | Propietario de vehículos; conserva identidad y datos de contacto [6]. | Sección F.1, RN-01, RF-15 [5, 6, 8] |
| **Vehiculo** | Entidad | Unidad física identificada por placa y VIN [6]. | Sección F.2, RN-01, RF-15 [5, 6, 8] |
| **ServicioCatalogo** | Entidad / Catálogo | Oferta de mantenimiento con valores de referencia [9]. | Sección F.3, RF-07 [9, 10] |
| **OrdenServicio** | Entidad Núcleo | Controla la recepción, diagnóstico y ciclo de vida [9]. | Sección F.4, RN-02, RN-03 [5, 9, 11] |
| **TareaOrden** | Entidad | Trabajo técnico específico asignado a un mecánico/técnico [9]. | Sección F.5, RN-06, RF-09 [9-11] |
| **Estimacion** | Entidad | Presupuesto proyectado de mano de obra y repuestos (versionado) [9]. | Sección F.6, RN-04, RF-10 [9-11] |
| **ItemEstimacion** | Entidad Asociativa / Detalle | Detalle individual de costo (servicio o repuesto) dentro de una estimación [12]. | Sección F.7 [12] |
| **Evidencia** | Entidad | Respaldo fotográfico o notas descriptivas adjuntas a la orden [12]. | Sección F.8, RN-08, RF-11 [10-12] |
| **HistorialEstadoOrden** | Entidad Evento / Histórico | Registro inmutable de transiciones de estado de la orden [12]. | Sección F.9, RF-20 [12, 13] |
| **AprobacionCliente** | Entidad Evento | Documenta la fecha, hora y decisión del cliente sobre una estimación [12]. | Sección F.10, RN-05, RF-17 [11-13] |
| **Notificacion** | Entidad Evento | Mensajes enviados al cliente ante cambios de estado [14]. | Sección F.11, RF-13 [14, 15] |
| **Administrador / Asesor / Técnico / Cliente** | Actores / Roles | Responsabilidades de interacción con el sistema [2, 5]. | Sección C, RF-01 [2, 14] |
| **ABIERTA / DIAGNOSTICO / ESPERA_APROBACION / EN_TRABAJO / LISTA_ENTREGA / ENTREGADA / CANCELADA** | Estados | Situaciones por las que pasa una orden de servicio [5]. | RN-02 [5] |

---

## 4. Entidades núcleo v0.1

### 4.1 `Cliente`
- **Responsabilidad:** Conserva la información del propietario del vehículo [6].
- **Atributos conceptuales:** `nombreCompleto`, `documentoIdentidad`, `correoElectronico`, `telefono`, `direccion`.
- **Identificador candidato de negocio:** `documentoIdentidad` o `correoElectronico` [16].

### 4.2 `Vehiculo`
- **Responsabilidad:** Representa la unidad automotriz que ingresa al taller [6].
- **Atributos conceptuales:** `placa`, `vin`, `marca`, `modelo`, `anio`, `color`, `kilometrajeActual`.
- **Identificador candidato de negocio:** `placa` / `vin` [8].

### 4.3 `ServicioCatalogo`
- **Responsabilidad:** Catálogo maestro de tareas o mantenimientos estándar [9].
- **Atributos conceptuales:** `codigoServicio`, `nombre`, `descripcion`, `precioReferencia`, `tiempoEstimadoMinutos`.
- **Identificador candidato de negocio:** `codigoServicio`.

### 4.4 `OrdenServicio`
- **Responsabilidad:** Documento vivo transaccional que coordina el ingreso, diagnóstico, avance y cierre [9].
- **Atributos conceptuales:** `numeroOrden`, `fechaRecepcion`, `fechaEntregaReal`, `kilometrajeIngreso`, `kilometrajeSalida`, `observacionesEntrega`, `estadoActual`.
- **Identificador candidato de negocio:** `numeroOrden`.

### 4.5 `TareaOrden`
- **Responsabilidad:** Actividad técnica individual ejecutada por un técnico dentro de una orden [9].
- **Atributos conceptuales:** `descripcionTarea`, `estadoTarea` (`PENDIENTE`, `EN_PROCESO`, `COMPLETADA`), `fechaAsignacion`, `fechaFinalizacion`.
- **Identificador candidato:** Combinación de `numeroOrden` + secuencia/código de tarea [17].

### 4.6 `Estimacion`
- **Responsabilidad:** Presupuesto de costos de reparación antes de la autorización del cliente [9].
- **Atributos conceptuales:** `numeroEstimacion`, `version`, `fechaCreacion`, `montoTotalEstimado`, `estadoEstimacion` (`BORRADOR`, `ENVIADA`, `APROBADA`, `RECHAZADA`).
- **Identificador candidato:** `numeroOrden` + `version` [11].

### 4.7 `ItemEstimacion`
- **Responsabilidad:** Desglose específico de cada repuesto o servicio cotizado dentro de una estimación [12].
- **Atributos conceptuales:** `tipoItem` (`SERVICIO`, `REPUESTO`), `descripcion`, `cantidad`, `costoUnitario`, `subtotal`.

### 4.8 `Evidencia`
- **Responsabilidad:** Registro visual (foto/imagen) o nota que respalda un hallazgo o trabajo [12].
- **Atributos conceptuales:** `rutaArchivoImagen`, `descripcion`, `fechaCarga`.

### 4.9 `HistorialEstadoOrden`
- **Responsabilidad:** Registro inmutable de cada cambio de estado de la orden [12].
- **Atributos conceptuales:** `estadoAnterior`, `estadoNuevo`, `fechaHoraCambio`, `observacion`.

### 4.10 `AprobacionCliente`
- **Responsabilidad:** Evidencia formal de la respuesta del cliente ante la estimación recibida [12].
- **Atributos conceptuales:** `decision` (`APROBADO`, `RECHAZADO`), `fechaHoraRespuesta`, `comentarioCliente`.

---

## 5. Relaciones en lenguaje natural
- Un **Cliente** posee/registra uno o varios **Vehículos** [5]. Cada **Vehículo** pertenece a un único **Cliente** [5].
- Un **Vehículo** puede tener múltiples **Órdenes de Servicio** a lo largo del tiempo, pero solo una **OrdenServicio** activa principal a la vez [5, 11].
- Una **OrdenServicio** contiene una o varias **TareasOrden** [9]. Cada **TareaOrden** pertenece a una única **OrdenServicio** [9].
- Una **OrdenServicio** genera una o varias versiones de **Estimación** [9, 11]. Cada **Estimación** pertenece a una **OrdenServicio** [9].
- Una **Estimación** contiene uno o varios **ItemsEstimacion** [12]. Cada **ItemEstimacion** forma parte de una sola **Estimación** [12].
- Una **Estimación** recibe máximo una **AprobacionCliente** para esa versión [11, 12].
- Una **OrdenServicio** puede incluir varias **Evidencias** adjuntas [11, 12]. Cada **Evidencia** se asocia a una **OrdenServicio** [11, 12].
- Una **OrdenServicio** acumula un **HistorialEstadoOrden** [12].

---

## 6. Cardinalidades

| Relación | Cardinalidad | Explicación / Regla de negocio |
|---|---|---|
| **Cliente — Vehiculo** | `1 : 1..*` | Un cliente puede tener varios vehículos; cada vehículo debe estar asociado obligatoriamente a un propietario [5]. |
| **Vehiculo — OrdenServicio** | `1 : 0..*` | Un vehículo puede acumular muchas órdenes en su historial; pero sólo 1 activa al mismo tiempo (RN-03) [5, 11]. |
| **OrdenServicio — TareaOrden** | `1 : 1..*` | Una orden requiere al menos una tarea técnica diagnosticada/asignada [9]. |
| **OrdenServicio — Estimacion** | `1 : 1..*` | Una orden puede tener varias versiones de estimación a medida que varían los costos (RN-04) [9, 11]. |
| **Estimacion — ItemEstimacion** | `1 : 1..*` | Una estimación debe contener al menos un ítem cotizado (mano de obra o repuesto) [12]. |
| **Estimacion — AprobacionCliente** | `1 : 0..1` | Cada versión enviada de estimación recibe cero o una respuesta formal de aprobación/rechazo (RN-05) [11, 12]. |
| **OrdenServicio — Evidencia** | `1 : 0..*` | Adjuntar evidencias fotográficas es opcional pero puede tener múltiples fotos (RN-08) [11, 12]. |
| **OrdenServicio — HistorialEstadoOrden** | `1 : 1..*` | Toda orden registra al menos su estado inicial `ABIERTA` [5, 12]. |

---

## 7. Reglas iniciales de integridad
- **RI-01 (Propietario obligatorio):** Todo vehículo registrado debe asociarse a un cliente activo (`RN-01`) [5].
- **RI-02 (Unicidad de Placa/VIN):** No se permiten dos vehículos con la misma placa o el mismo número VIN en el sistema (`RF-15`) [8].
- **RI-03 (Orden activa única):** Un vehículo no puede estar en dos órdenes con estado activo simultáneamente salvo excepción autorizada (`RN-03`) [11].
- **RI-04 (Estados válidos de orden):** La orden sólo puede transitar entre los estados permitidos: `ABIERTA`, `DIAGNOSTICO`, `ESPERA_APROBACION`, `EN_TRABAJO`, `LISTA_ENTREGA`, `ENTREGADA`, `CANCELADA` (`RN-02`) [5].
- **RI-05 (Versionado inmutable de estimación):** Si cambian costos o ítems, se genera una nueva versión de estimación (`RN-04`) [11].
- **RI-06 (Condición de entrega):** Para marcar la orden como `ENTREGADA` es obligatorio que todas sus tareas estén en estado `COMPLETADA` y se registre fecha, kilometraje de salida y observaciones (`RN-07`) [11].

---

## 8. Trazabilidad del Flujo Crítico (Demostración de Soporte)
1. **Asesor abre orden:** Se crea la `OrdenServicio` (asociada al `Vehiculo` y `Cliente`) en estado `ABIERTA` y se genera la primera entrada en `HistorialEstadoOrden` [5, 7, 12].
2. **Técnico recibe tareas:** Se registran las instancias de `TareaOrden` vinculadas a la `OrdenServicio` asignadas al técnico [7, 9].
3. **Se genera estimación:** Se crea la `Estimacion` (versión 1) con sus correspondientes `ItemEstimacion` en estado `ESPERA_APROBACION` [7, 9, 11, 12].
4. **Cliente aprueba desde móvil:** Se inserta el registro `AprobacionCliente` marcando la decisión `APROBADO` [7, 11, 12].
5. **Técnico actualiza trabajo:** La orden pasa a `EN_TRABAJO`, el técnico cambia las `TareaOrden` a `COMPLETADA` y adjunta registros en `Evidencia` [7, 9, 11, 12].
6. **Asesor entrega vehículo:** Se verifica la regla `RI-06`, se registra el kilometraje de salida y la `OrdenServicio` pasa a estado `ENTREGADA` [7, 11].

---

## 9. Pendientes para la Clase 03
- Transformar este modelo conceptual en el **Modelo Relacional** con claves primarias (`PK`) y claves foráneas (`FK`) [18].
- Definir tipos de datos físicos en PostgreSQL (`BIGINT`, `VARCHAR`, `NUMERIC`, `TIMESTAMPTZ`) [19].
- Resolver detalles de relaciones N:M e implementar restricciones de unicidad (`UNIQUE`) y verificación (`CHECK`) [18, 20].