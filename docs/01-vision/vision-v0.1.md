# Visión v0.1 — AutoCare 360

## 1. Contexto

Un taller automotriz multimarca necesita abandonar los formularios físicos y reemplazarlos por una plataforma única que acompañe cada vehículo desde que ingresa hasta que se entrega. El taller quiere seguimiento web interno y una app móvil para que el propietario consulte el avance.

## 2. Problema

Con formularios físicos es difícil saber el estado real de cada orden, quién es responsable de cada tarea, qué estimación aprobó el cliente y con qué evidencias se respaldó el trabajo. El propietario depende de llamadas o visitas para enterarse del avance, y el taller pierde trazabilidad de decisiones, costos y cambios.

## 3. Objetivo

Controlar el ciclo completo de una orden de servicio, desde la recepción del vehículo hasta su entrega, con evidencias, responsables, estimaciones y trazabilidad.

## 4. Actores

### Administrador
Configura catálogos, usuarios y parámetros, y supervisa la operación completa.

### Asesor de servicio
Opera los procesos diarios habilitados para su función: recibe el vehículo, abre la orden, registra información transaccional y realiza la entrega.

### Técnico
Ejecuta el trabajo especializado asignado, actualiza estados y aporta evidencias y seguimiento.

### Cliente / propietario
Usuario externo que consulta el avance, aprueba o rechaza estimaciones y realiza acciones de autoservicio autorizadas desde el móvil.

## 5. Alcance del MVP

1. Gestión de clientes.
2. Gestión de vehículos asociados a un propietario activo.
3. Catálogo de servicios.
4. Órdenes de servicio con estados y flujo válido.
5. Tareas técnicas con responsable y estado.
6. Estimaciones versionadas y aprobación del cliente.
7. Evidencias asociadas a la orden.
8. Estados y entrega del vehículo.
9. Notificaciones al propietario.
10. Reportes e indicadores de tiempos y carga de trabajo.

## 6. Exclusiones (propuesta, a validar con el docente)

No incluye pasarela de pagos real, facturación fiscal, control de inventario de repuestos, agenda de citas en línea, diagnóstico electrónico del vehículo, geolocalización en tiempo real ni decisiones automáticas de negocio mediante IA.

## 7. Éxito inicial del proyecto

El proyecto será exitoso cuando pueda demostrar, con datos persistidos, el flujo completo: el asesor abre una orden, el técnico recibe tareas, se genera una estimación, el cliente la aprueba desde el móvil, el técnico actualiza el trabajo y el asesor entrega el vehículo, consumido por web y móvil sobre el mismo backend.
