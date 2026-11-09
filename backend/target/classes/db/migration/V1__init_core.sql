-- ==========================================
-- AutoCare 360 - Migración Inicial V1 (DDL)
-- ==========================================

-- 1. Tabla: cliente
CREATE TABLE cliente (
    cliente_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    documento_identidad VARCHAR(30) NOT NULL,
    correo_electronico VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_cliente_documento UNIQUE (documento_identidad),
    CONSTRAINT uk_cliente_correo UNIQUE (correo_electronico),
    CONSTRAINT ck_cliente_nombre_no_vacio CHECK (BTRIM(nombre_completo) <> '')
);

-- 2. Tabla: servicio_catalogo
CREATE TABLE servicio_catalogo (
    servicio_catalogo_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_servicio VARCHAR(30) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_referencia NUMERIC(12,2) NOT NULL,
    tiempo_estimado_minutos INTEGER NOT NULL,
    CONSTRAINT uk_servicio_codigo UNIQUE (codigo_servicio),
    CONSTRAINT ck_servicio_precio CHECK (precio_referencia >= 0),
    CONSTRAINT ck_servicio_tiempo CHECK (tiempo_estimado_minutos > 0)
);

-- 3. Tabla: vehiculo
CREATE TABLE vehiculo (
    vehiculo_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    placa VARCHAR(20) NOT NULL,
    vin VARCHAR(17) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INTEGER NOT NULL,
    color VARCHAR(30) NOT NULL,
    kilometraje_actual INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehiculo_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id) ON DELETE RESTRICT,
    CONSTRAINT uk_vehiculo_placa UNIQUE (placa),
    CONSTRAINT uk_vehiculo_vin UNIQUE (vin),
    CONSTRAINT ck_vehiculo_anio CHECK (anio >= 1900),
    CONSTRAINT ck_vehiculo_kilometraje CHECK (kilometraje_actual >= 0)
);

-- 4. Tabla: orden_servicio
CREATE TABLE orden_servicio (
    orden_servicio_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vehiculo_id BIGINT NOT NULL,
    numero_orden VARCHAR(30) NOT NULL,
    fecha_recepcion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega_real TIMESTAMPTZ,
    kilometraje_ingreso INTEGER NOT NULL,
    kilometraje_salida INTEGER,
    observaciones_entrega TEXT,
    estado_actual VARCHAR(30) NOT NULL,
    CONSTRAINT fk_orden_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculo(vehiculo_id) ON DELETE RESTRICT,
    CONSTRAINT uk_orden_numero UNIQUE (numero_orden),
    CONSTRAINT ck_orden_kilometraje_ingreso CHECK (kilometraje_ingreso >= 0),
    CONSTRAINT ck_orden_kilometraje_salida CHECK (kilometraje_salida IS NULL OR kilometraje_salida >= kilometraje_ingreso),
    CONSTRAINT ck_orden_estado CHECK (estado_actual IN ('ABIERTA', 'DIAGNOSTICO', 'ESPERA_APROBACION', 'EN_TRABAJO', 'LISTA_ENTREGA', 'ENTREGADA', 'CANCELADA'))
);

-- 5. Tabla: tarea_orden
CREATE TABLE tarea_orden (
    tarea_orden_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    orden_servicio_id BIGINT NOT NULL,
    descripcion_tarea TEXT NOT NULL,
    estado_tarea VARCHAR(20) NOT NULL,
    fecha_asignacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion TIMESTAMPTZ,
    CONSTRAINT fk_tarea_orden FOREIGN KEY (orden_servicio_id) REFERENCES orden_servicio(orden_servicio_id) ON DELETE CASCADE,
    CONSTRAINT ck_tarea_estado CHECK (estado_tarea IN ('PENDIENTE', 'EN_PROCESO', 'COMPLETADA'))
);

-- 6. Tabla: estimacion
CREATE TABLE estimacion (
    estimacion_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    orden_servicio_id BIGINT NOT NULL,
    version INTEGER NOT NULL,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    monto_total_estimado NUMERIC(12,2) NOT NULL,
    estado_estimacion VARCHAR(20) NOT NULL,
    CONSTRAINT fk_estimacion_orden FOREIGN KEY (orden_servicio_id) REFERENCES orden_servicio(orden_servicio_id) ON DELETE CASCADE,
    CONSTRAINT uk_estimacion_orden_version UNIQUE (orden_servicio_id, version),
    CONSTRAINT ck_estimacion_monto CHECK (monto_total_estimado >= 0),
    CONSTRAINT ck_estimacion_estado CHECK (estado_estimacion IN ('BORRADOR', 'ENVIADA', 'APROBADA', 'RECHAZADA'))
);

-- 7. Tabla: item_estimacion
CREATE TABLE item_estimacion (
    item_estimacion_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    estimacion_id BIGINT NOT NULL,
    servicio_catalogo_id BIGINT,
    tipo_item VARCHAR(20) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    cantidad INTEGER NOT NULL,
    costo_unitario NUMERIC(12,2) NOT NULL,
    subtotal NUMERIC(12,2) NOT NULL,
    CONSTRAINT fk_item_estimacion FOREIGN KEY (estimacion_id) REFERENCES estimacion(estimacion_id) ON DELETE CASCADE,
    CONSTRAINT fk_item_servicio FOREIGN KEY (servicio_catalogo_id) REFERENCES servicio_catalogo(servicio_catalogo_id) ON DELETE SET NULL,
    CONSTRAINT ck_item_tipo CHECK (tipo_item IN ('SERVICIO', 'REPUESTO')),
    CONSTRAINT ck_item_cantidad CHECK (cantidad > 0),
    CONSTRAINT ck_item_costo CHECK (costo_unitario >= 0),
    CONSTRAINT ck_item_subtotal CHECK (subtotal >= 0)
);

-- 8. Tabla: aprobacion_cliente
CREATE TABLE aprobacion_cliente (
    aprobacion_cliente_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    estimacion_id BIGINT NOT NULL,
    decision VARCHAR(20) NOT NULL,
    fecha_hora_respuesta TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    comentario_cliente TEXT,
    CONSTRAINT fk_aprobacion_estimacion FOREIGN KEY (estimacion_id) REFERENCES estimacion(estimacion_id) ON DELETE CASCADE,
    CONSTRAINT uk_aprobacion_estimacion UNIQUE (estimacion_id),
    CONSTRAINT ck_aprobacion_decision CHECK (decision IN ('APROBADO', 'RECHAZADO'))
);

-- 9. Tabla: evidencia
CREATE TABLE evidencia (
    evidencia_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    orden_servicio_id BIGINT NOT NULL,
    ruta_archivo_imagen VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_carga TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_evidencia_orden FOREIGN KEY (orden_servicio_id) REFERENCES orden_servicio(orden_servicio_id) ON DELETE CASCADE
);

-- 10. Tabla: historial_estado_orden
CREATE TABLE historial_estado_orden (
    historial_estado_orden_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    orden_servicio_id BIGINT NOT NULL,
    estado_anterior VARCHAR(30),
    estado_nuevo VARCHAR(30) NOT NULL,
    fecha_hora_cambio TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacion TEXT,
    CONSTRAINT fk_historial_orden FOREIGN KEY (orden_servicio_id) REFERENCES orden_servicio(orden_servicio_id) ON DELETE CASCADE
);