# AutoCare 360

Sistema académico full-stack (web + móvil) para controlar el ciclo completo de una orden de servicio en un taller automotriz, desde la recepción del vehículo hasta su entrega.

## 1. Problema

Un taller multimarca trabaja con formularios físicos para registrar clientes, vehículos, diagnósticos preliminares, órdenes, tareas, repuestos estimados, estados y entregas. Esto dificulta saber en qué estado está cada vehículo, quién es responsable de cada trabajo, qué costos se aprobaron y qué evidencias existen. El propietario, además, no tiene forma de consultar el avance de su vehículo.

## 2. Objetivo del MVP

Construir una plataforma que permita registrar clientes y vehículos, abrir órdenes de servicio, asignar tareas a técnicos, generar y versionar estimaciones, permitir que el cliente las apruebe o rechace desde el móvil, adjuntar evidencias, entregar el vehículo y consultar el historial completo de cada orden, con responsables y trazabilidad.

## 3. Actores principales

- Administrador: configura catálogos, usuarios y parámetros; supervisa la operación completa.
- Asesor de servicio: opera los procesos diarios (recepción, órdenes, estimaciones, entrega).
- Técnico: ejecuta el trabajo asignado, actualiza estados y aporta evidencias.
- Cliente / propietario: consulta el avance de su vehículo y aprueba o rechaza estimaciones desde el móvil.

## 4. Alcance inicial

- Clientes
- Vehículos
- Catálogo de servicios
- Órdenes de servicio
- Tareas técnicas
- Estimaciones
- Evidencias
- Estados y entregas
- Notificaciones
- Reportes

Flujo crítico del MVP: el asesor abre una orden, el técnico recibe tareas, se genera una estimación, el cliente la aprueba desde el móvil, el técnico actualiza el trabajo y el asesor entrega el vehículo.

## 5. Fuera de alcance (propuesta, a validar con el docente)

La ficha oficial define un alcance cerrado. Para evitar crecimiento descontrolado, se propone excluir lo que no aparece en él:

- Pasarela de pagos real y facturación fiscal
- Control de inventario y compra de repuestos (solo se estiman repuestos)
- Agenda de citas en línea
- Diagnóstico electrónico del vehículo (OBD, sensores, IoT)
- Geolocalización en tiempo real
- IA que decida o persista información sin confirmación humana

## 6. Stack objetivo del semestre

- Backend: Java 21 + Spring Boot
- Base de datos: PostgreSQL con migraciones versionadas
- Web: React + TypeScript
- Móvil: React Native + TypeScript
- Contenedores: Docker / Docker Compose
- CI: GitHub Actions
- Versionado: Git + GitHub
- IA: Spring AI, solo como apoyo secundario (sugerir tareas a partir de observaciones del asesor, con confirmación humana)

## 7. Estado actual

Clase 01: comprensión del problema, alcance, lenguaje inicial del dominio y backlog v0.1. Todavía no existe código de aplicación.

## 8. Documentación

- `docs/01-vision/vision-v0.1.md`
- `docs/01-vision/glossary-v0.1.md`
- `docs/02-requirements/backlog-v0.1.md`
- `docs/03-decisions/`

## 9. Regla de trabajo

Cada cambio importante debe ser comprensible, trazable y defendible. El repositorio es la fuente de verdad del proyecto.
