# Convenciones de Base de Datos — AutoCare 360 v0.1

## 1. Nombres y Estilo
- **Tablas:** `snake_case`, sustantivo en singular (`cliente`, `vehiculo`, `orden_servicio`).
- **Columnas:** `snake_case` (`nombre_completo`, `correo_electronico`, `kilometraje_ingreso`).
- **Clave Primaria (PK):** `<tabla>_id` (`cliente_id`, `vehiculo_id`, `orden_servicio_id`).
- **Clave Foránea (FK):** `<tabla_referenciada>_id` (`cliente_id` en `vehiculo`).
- **Restricción UNIQUE:** `uk_<tabla>_<columna(s)>` (`uk_vehiculo_placa`, `uk_vehiculo_vin`).
- **Restricción CHECK:** `ck_<tabla>_<concepto>` (`ck_orden_servicio_estado`, `ck_orden_servicio_kilometraje`).
- **Restricción FK:** `fk_<tabla_origen>_<tabla_destino>` (`fk_vehiculo_cliente`).
- **Índices:** `idx_<tabla>_<columna(s)>` (`idx_orden_servicio_vehiculo_id`).

---

## 2. Tipos Candidatos de PostgreSQL
- **Identificador técnico (PK):** `BIGINT` autogenerado (`GENERATED ALWAYS AS IDENTITY`).
- **Texto corto/códigos:** `VARCHAR(n)` con límite justificado (`VARCHAR(20)` para placa, `VARCHAR(17)` para VIN, `VARCHAR(150)` para nombres).
- **Texto amplio/descripciones:** `TEXT` (observaciones, notas de entrega, descripciones de tareas).
- **Importes/Monedas:** `NUMERIC(12,2)` para exactitud decimal en presupuestos e ítems.
- **Cantidades/Contadores:** `INTEGER` (cantidad de ítems, versión de estimación, kilometraje).
- **Fecha calendario:** `DATE` (para fechas sin hora).
- **Instante con hora (Timestamps):** `TIMESTAMPTZ` (`TIMESTAMP WITH TIME ZONE`) para conservar instantes precisos de recepciones, entregas y respuestas.
- **Booleanos:** `BOOLEAN` (`TRUE`/`FALSE`).
- **Estados controlados:** `VARCHAR(30)` restringido mediante `CHECK (columna IN (...))` para mantener legibilidad sin números mágicos.

---

## 3. Campos de Auditoría Básica
- `created_at`: `TIMESTAMPTZ NOT NULL DEFAULT now()` (registro automático del instante de creación).
- `updated_at`: `TIMESTAMPTZ` (instante de última modificación).