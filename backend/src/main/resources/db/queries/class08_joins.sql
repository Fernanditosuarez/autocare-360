-- =============================================================================
-- AutoCare 360 - Clase 08: Consultas Relacionales (JOIN)
-- =============================================================================

-- Q1. INNER JOIN de 2 tablas
-- Pregunta de negocio: ¿Qué cliente es el propietario de cada vehículo registrado?
-- Relaciones: vehiculo.cliente_id (FK) -> cliente.cliente_id (PK)
-- Cada fila representa: Un vehículo específico junto con los datos de contacto de su dueño.
SELECT
    v.vehiculo_id,
    v.placa,
    v.marca,
    v.modelo,
    v.anio,
    c.nombre_completo AS propietario,
    c.telefono,
    c.correo_electronico
FROM vehiculo v
INNER JOIN cliente c ON c.cliente_id = v.cliente_id
ORDER BY v.marca ASC;

-- Q2. JOIN encadenado de 3 tablas
-- Pregunta de negocio: ¿A qué vehículo y a qué cliente corresponde cada orden de servicio activa?
-- Relaciones: orden_servicio.vehiculo_id (FK) -> vehiculo.vehiculo_id (PK)
--             vehiculo.cliente_id (FK) -> cliente.cliente_id (PK)
-- Cada fila representa: Una orden de trabajo con el detalle del auto ingresado y su propietario.
SELECT
    o.orden_servicio_id,
    o.numero_orden,
    o.estado_actual,
    v.placa,
    v.marca,
    v.modelo,
    c.nombre_completo AS cliente,
    c.telefono
FROM orden_servicio o
INNER JOIN vehiculo v ON v.vehiculo_id = o.vehiculo_id
INNER JOIN cliente c ON c.cliente_id = v.cliente_id
ORDER BY o.orden_servicio_id ASC;

-- Q3. JOIN con filtro WHERE
-- Pregunta de negocio: ¿Qué vehículos con kilometraje superior a 40,000 km pertenecen a un cliente específico?
-- Relaciones: vehiculo.cliente_id (FK) -> cliente.cliente_id (PK)
-- Cada fila representa: Un vehículo de alto kilometraje filtrado por condición técnica y de cliente.
SELECT
    v.placa,
    v.marca,
    v.modelo,
    v.kilometraje_actual,
    c.nombre_completo AS propietario
FROM vehiculo v
INNER JOIN cliente c ON c.cliente_id = v.cliente_id
WHERE v.kilometraje_actual > 40000 AND c.nombre_completo ILIKE '%Mendoza%';

-- Q4. LEFT JOIN (conservar registros aunque no tengan hijos)
-- Pregunta de negocio: ¿Cuáles son todos los clientes registrados y qué vehículos tienen asociados, incluyendo clientes nuevos sin autos?
-- Relaciones: cliente.cliente_id (PK) <- vehiculo.cliente_id (FK)
-- Cada fila representa: Un cliente del taller, mostrando sus autos si los tiene o NULL si aún no registra ninguno.
SELECT
    c.cliente_id,
    c.nombre_completo,
    c.telefono,
    v.placa,
    v.marca,
    v.modelo
FROM cliente c
LEFT JOIN vehiculo v ON v.cliente_id = c.cliente_id
ORDER BY c.cliente_id ASC;

-- Q5. Registros sin coincidencia (Detección de huérfanos/inactivos mediante IS NULL)
-- Pregunta de negocio: ¿Qué clientes registrados en el sistema todavía no tienen ningún vehículo registrado a su nombre?
-- Relaciones: cliente.cliente_id (PK) <- vehiculo.cliente_id (FK)
-- Cada fila representa: Un cliente potencial que aún no ha dado de alta ningún vehículo en el taller.
SELECT
    c.cliente_id,
    c.nombre_completo,
    c.correo_electronico,
    c.telefono
FROM cliente c
LEFT JOIN vehiculo v ON v.cliente_id = c.cliente_id
WHERE v.vehiculo_id IS NULL;

-- Q6. Consulta adicional del dominio: Tareas y servicios cotizados en una orden
-- Pregunta de negocio: ¿Qué tareas técnicas y servicios del catálogo están presupuestados en cada estimación?
-- Relaciones: item_estimacion.estimacion_id (FK) -> estimacion.estimacion_id (PK)
--             item_estimacion.servicio_catalogo_id (FK) -> servicio_catalogo.servicio_catalogo_id (PK)
-- Cada fila representa: Un renglón de la cotización con la descripción del trabajo y su subtotal presupuestado.
SELECT
    e.orden_servicio_id,
    e.version AS version_estimacion,
    e.estado_estimacion,
    sc.codigo_servicio,
    ie.descripcion AS detalle_item,
    ie.cantidad,
    ie.costo_unitario,
    ie.subtotal
FROM estimacion e
INNER JOIN item_estimacion ie ON ie.estimacion_id = e.estimacion_id
LEFT JOIN servicio_catalogo sc ON sc.servicio_catalogo_id = ie.servicio_catalogo_id
ORDER BY e.orden_servicio_id, ie.item_estimacion_id;