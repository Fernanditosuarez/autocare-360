-- ======================================================
-- AutoCare 360 - Script de Datos Semilla V2 (DML)
-- ======================================================

-- 1. Insertar Clientes (Tabla Padre)
INSERT INTO cliente (nombre_completo, documento_identidad, correo_electronico, telefono, direccion) VALUES
                                                                                                        ('Carlos Mendoza', '10203040', 'carlos.mendoza@email.com', '70011223', 'Av. Las Palmas #123'),
                                                                                                        ('María Fernández', '20304050', 'maria.fernandez@email.com', '71122334', 'Calle Los Pinos #456'),
                                                                                                        ('Roberto Gómez', '30405060', 'roberto.gomez@email.com', '72233445', 'Av. Central #789');

-- 2. Insertar Catálogo de Servicios (Tabla Padre)
INSERT INTO servicio_catalogo (codigo_servicio, nombre, descripcion, precio_referencia, tiempo_estimado_minutos) VALUES
                                                                                                                     ('SRV-001', 'Mantenimiento Preventivo Básico', 'Cambio de aceite, filtro y revisión de fluidos', 150.00, 60),
                                                                                                                     ('SRV-002', 'Alineación y Balanceo', 'Alineación computarizada y balanceo de 4 ruedas', 120.00, 45),
                                                                                                                     ('SRV-003', 'Diagnóstico de Sistema de Frenos', 'Inspección técnica de pastillas, discos y líquido', 80.00, 30),
                                                                                                                     ('SRV-004', 'Cambio de Pastillas de Freno', 'Sustitución de pastillas delanteras e inspección', 220.00, 90);

-- 3. Insertar Vehículos (Depende de cliente)
INSERT INTO vehiculo (cliente_id, placa, vin, marca, modelo, anio, color, kilometraje_actual) VALUES
                                                                                                  (1, '4050-ABC', '1HGCR2F83HA000001', 'Honda', 'Accord', 2017, 'Gris', 85000),
                                                                                                  (2, '5060-DEF', '3N1AB7AP4KL000002', 'Nissan', 'Sentra', 2020, 'Blanco', 42000),
                                                                                                  (3, '6070-GHI', '1FA6P8CF0R500003', 'Ford', 'Mustang', 2021, 'Rojo', 28000);

-- 4. Insertar Órdenes de Servicio (Depende de vehiculo)
INSERT INTO orden_servicio (vehiculo_id, numero_orden, kilometraje_ingreso, estado_actual) VALUES
                                                                                               (1, 'ORD-20261029-0001', 85000, 'EN_TRABAJO'),
                                                                                               (2, 'ORD-20261029-0002', 42000, 'ESPERA_APROBACION'),
                                                                                               (3, 'ORD-20261029-0003', 28000, 'DIAGNOSTICO');

-- 5. Insertar Tareas de Orden (Depende de orden_servicio)
INSERT INTO tarea_orden (orden_servicio_id, descripcion_tarea, estado_tarea) VALUES
                                                                                 (1, 'Drenar aceite de motor usado y retirar filtro antiguo', 'COMPLETADA'),
                                                                                 (1, 'Instalar filtro nuevo y cargar aceite sintético 5W-30', 'EN_PROCESO'),
                                                                                 (2, 'Realizar prueba en banco de frenos delantero', 'PENDIENTE');

-- 6. Insertar Estimación (Depende de orden_servicio)
INSERT INTO estimacion (orden_servicio_id, version, monto_total_estimado, estado_estimacion) VALUES
                                                                                                 (1, 1, 150.00, 'APROBADA'),
                                                                                                 (2, 1, 300.00, 'ENVIADA');

-- 7. Insertar Ítems de Estimación (Depende de estimacion y servicio_catalogo)
INSERT INTO item_estimacion (estimacion_id, servicio_catalogo_id, tipo_item, descripcion, cantidad, costo_unitario, subtotal) VALUES
                                                                                                                                  (1, 1, 'SERVICIO', 'Mantenimiento Preventivo Básico', 1, 150.00, 150.00),
                                                                                                                                  (2, 3, 'SERVICIO', 'Diagnóstico de Sistema de Frenos', 1, 80.00, 80.00),
                                                                                                                                  (2, 4, 'SERVICIO', 'Cambio de Pastillas de Freno', 1, 220.00, 220.00);