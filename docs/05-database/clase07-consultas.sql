-- ======================================================
-- AutoCare 360 - Consultas de Negocio de la Clase 07
-- ======================================================

-- Q1. Listado de clientes ordenados alfabéticamente
SELECT cliente_id, nombre_completo, documento_identidad, correo_electronico, telefono
FROM cliente
ORDER BY nombre_completo ASC;

-- Q2. Consultar vehículos registrados con kilometraje mayor a 40,000 km
SELECT vehiculo_id, placa, marca, modelo, anio, kilometraje_actual
FROM vehiculo
WHERE kilometraje_actual > 40000
ORDER BY kilometraje_actual DESC;

-- Q3. Filtrar órdenes de servicio activas en trabajo o espera de aprobación
SELECT orden_servicio_id, numero_orden, vehiculo_id, estado_actual, fecha_recepcion
FROM orden_servicio
WHERE estado_actual IN ('EN_TRABAJO', 'ESPERA_APROBACION');

-- Q4. Buscar un cliente por coincidencia parcial en el nombre (LIKE/ILIKE)
SELECT cliente_id, nombre_completo, correo_electronico
FROM cliente
WHERE nombre_completo ILIKE '%Fernández%';

-- Q5. Consultar órdenes pendientes que aún no tienen fecha de entrega real (IS NULL)
SELECT orden_servicio_id, numero_orden, estado_actual, fecha_entrega_real
FROM orden_servicio
WHERE fecha_entrega_real IS NULL;

-- Q6. Consultar servicios del catálogo con precios de referencia entre 100 y 200 (BETWEEN)
SELECT servicio_catalogo_id, codigo_servicio, nombre, precio_referencia
FROM servicio_catalogo
WHERE precio_referencia BETWEEN 100.00 AND 200.00;

-- Q7. Proceso de UPDATE seguro (SELECT -> UPDATE -> SELECT) para actualizar kilometraje
-- Paso 7a: Verificar valor actual
SELECT vehiculo_id, placa, kilometraje_actual FROM vehiculo WHERE vehiculo_id = 1;
-- Paso 7b: Actualizar
UPDATE vehiculo SET kilometraje_actual = 85500 WHERE vehiculo_id = 1;
-- Paso 7c: Confirmar cambio
SELECT vehiculo_id, placa, kilometraje_actual FROM vehiculo WHERE vehiculo_id = 1;

-- Q8. Tareas técnicas en proceso o completadas asociadas a una orden específica
SELECT tarea_orden_id, orden_servicio_id, descripcion_tarea, estado_tarea
FROM tarea_orden
WHERE orden_servicio_id = 1 AND estado_tarea <> 'PENDIENTE';