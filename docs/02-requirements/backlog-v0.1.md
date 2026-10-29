# Backlog v0.1 — AutoCare 360

## Convención de prioridad

- P0: imprescindible para el flujo crítico del MVP (abrir orden → tareas → estimación → aprobación móvil → trabajo → entrega).
- P1: importante para completar la operación.
- P2: complemento posterior.

---

### AC-001 — Registrar cliente y vehículo
**Prioridad:** P0
Como asesor de servicio, quiero registrar un cliente y su vehículo, sin duplicar placa/VIN, para poder abrir órdenes asociadas a un propietario activo.

### AC-002 — Abrir orden de servicio
**Prioridad:** P0
Como asesor de servicio, quiero abrir una orden al recibir un vehículo para iniciar su seguimiento desde la recepción.

### AC-003 — Asignar tareas a técnicos
**Prioridad:** P0
Como asesor de servicio, quiero asignar tareas con responsable y estado a los técnicos para que el trabajo quede repartido y controlado.

### AC-004 — Generar estimación
**Prioridad:** P0
Como asesor de servicio, quiero generar una estimación de servicios y repuestos para que el cliente conozca el costo antes de autorizar el trabajo.

### AC-005 — Aprobar o rechazar estimación desde el móvil
**Prioridad:** P0
Como cliente, quiero aprobar o rechazar una estimación desde mi móvil para decidir sin ir al taller, quedando registrada la fecha y mi decisión.

### AC-006 — Actualizar el avance del trabajo
**Prioridad:** P0
Como técnico, quiero actualizar el estado de mis tareas para que el taller y el cliente sepan en qué punto está el vehículo.

### AC-007 — Entregar el vehículo
**Prioridad:** P0
Como asesor de servicio, quiero registrar la entrega con fecha, kilometraje de salida y observaciones, una vez cerradas las tareas obligatorias, para cerrar la orden de forma controlada.

### AC-008 — Gestionar catálogo de servicios
**Prioridad:** P1
Como administrador, quiero mantener el catálogo de servicios para que las órdenes y estimaciones usen servicios definidos por el taller.

### AC-009 — Versionar estimaciones
**Prioridad:** P1
Como asesor de servicio, quiero que cada cambio de costos o alcance genere una nueva versión de la estimación para conservar qué se propuso y qué se aprobó.

### AC-010 — Adjuntar evidencias
**Prioridad:** P1
Como técnico, quiero adjuntar evidencias con descripción a la orden para respaldar el trabajo realizado.

### AC-011 — Consultar historial completo de la orden
**Prioridad:** P1
Como asesor de servicio, quiero consultar el historial de estados, tareas, estimaciones y evidencias de una orden para tener trazabilidad completa.

### AC-012 — Consultar mis vehículos y el estado de mis órdenes
**Prioridad:** P1
Como cliente, quiero ver mis vehículos y el estado de sus órdenes desde el móvil para conocer el avance sin llamar al taller.

### AC-013 — Recibir notificaciones
**Prioridad:** P1
Como cliente, quiero recibir notificaciones sobre el avance y las estimaciones pendientes para actuar a tiempo.

### AC-014 — Ver órdenes por estado
**Prioridad:** P1
Como asesor de servicio, quiero ver las órdenes agrupadas por estado para identificar cuáles requieren atención.

### AC-015 — Consultar indicadores de tiempos y carga de trabajo
**Prioridad:** P2
Como administrador, quiero consultar reportes de tiempos y carga de trabajo para supervisar la operación del taller.

### AC-016 — Autorizar una segunda orden activa para un vehículo
**Prioridad:** P2
Como administrador, quiero autorizar de forma registrada una segunda orden activa para un vehículo para atender casos excepcionales.

### AC-017 — Sugerir tareas a partir de observaciones
**Prioridad:** P2
Como asesor de servicio, quiero que un asistente convierta mis observaciones en tareas sugeridas, que yo confirmo antes de guardarlas, para ahorrar tiempo de registro.

---

> Una historia no es "crear tabla", "hacer endpoint" ni "hacer formulario". Es una necesidad que genera valor para un actor. Las tareas técnicas aparecerán después para implementar cada historia.
