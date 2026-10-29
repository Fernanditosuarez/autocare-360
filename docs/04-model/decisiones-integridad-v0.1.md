# Decisiones de Integridad v0.1 — AutoCare 360

## 1. Matriz de Trazabilidad Regla -> Mecanismo de Integridad

| RN / RF | Regla de Negocio / Requisito | Protección Prevista | Justificación de Ingeniería |
|---|---|---|---|
| **RN-01 / RF-15** | Cada vehículo debe asociarse a un propietario activo sin duplicar placa ni VIN. | `FK (cliente_id) NOT NULL`, `UNIQUE (placa)`, `UNIQUE (vin)` | Garantiza que no existan vehículos huérfanos ni duplicados físicos en el sistema. |
| **RN-02 / RF-16** | Una orden solo puede tener estados válidos (`ABIERTA`, `DIAGNOSTICO`, `ESPERA_APROBACION`, `EN_TRABAJO`, `LISTA_ENTREGA`, `ENTREGADA`, `CANCELADA`). | `CHECK (estado_actual IN (...))` / Enum en Backend | Evita estados inconsistentes no contemplados en el flujo operativo del taller. |
| **RN-03** | Solo una orden activa principal por vehículo salvo excepción administrativa. | Regla Transaccional / Backend + Índice parcial | Impide abrir múltiples reparaciones paralelas para un mismo automóvil. |
| **RN-04 / RF-10** | Toda estimación debe versionarse cuando cambien costos o alcance. | `UNIQUE (orden_servicio_id, version)` | Asegura la inmutabilidad de presupuestos anteriores conservando el historial. |
| **RN-05 / RF-17** | El cliente aprueba o rechaza una estimación registrando fecha y decisión. | `UNIQUE (estimacion_id)` en `aprobacion_cliente` | Evita que una misma versión de presupuesto sea aprobada o rechazada múltiples veces. |
| **RN-06 / RF-18** | Las tareas deben tener estado y responsable asignado. | `NOT NULL (estado_tarea)`, `CHECK (estado_tarea IN ('PENDIENTE','EN_PROCESO','COMPLETADA'))` | Mantiene el control de ejecución sobre el trabajo del mecánico. |
| **RN-07 / RF-12** | La entrega requiere cerrar tareas obligatorias, registrar fecha, kilometraje de salida y observaciones. | Validaciones en Backend + `CHECK (kilometraje_salida >= kilometraje_ingreso)` | Protege la integridad transaccional del cierre de orden impidiendo salidas incompletas. |
| **RN-08 / RF-11** | Las evidencias adjuntas deben asociarse a la orden y tener descripción. | `FK (orden_servicio_id) NOT NULL`, `NOT NULL (descripcion)` | Asegura respaldo fotográfico o documental trazable por orden. |

---

## 2. Ejercicio de Prueba de Contradicción (Escenarios Inválidos Evitados)

| Regla | Estado Inválido Intentado | Protección Prevista | Resultado Esperado |
|---|---|---|---|
| **RN-01** | Intentar registrar dos vehículos distintos con la misma placa `1234-ABC`. | Constraint `UNIQUE(placa)` en base de datos. | La BD o el backend rechazan la transacción arrojando error de duplicidad. |
| **RN-07** | Intentar entregar un vehículo registrando un `kilometraje_salida` menor al de ingreso. | Restricción `CHECK (kilometraje_salida >= kilometraje_ingreso)`. | Se cancela la actualización impidiendo datos de odómetro imposibles. |
| **RN-05** | Intentar registrar dos decisiones de aprobación opuestas para la misma versión de estimación. | Constraint `UNIQUE(estimacion_id)` en `aprobacion_cliente`. | Se bloquea el segundo intento garantizando una única respuesta por presupuesto enviado. |