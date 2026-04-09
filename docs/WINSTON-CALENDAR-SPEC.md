# Informe Técnico: Calendario de Citas y Rangos de Atención
# Autor: Winston (Arquitecto de Sistema) — 2026-04-04
# Para: Sally (UX Designer)

## Resumen Ejecutivo
El calendario de citas tiene 3 conceptos clave que el mockup actual NO refleja:
1. **Rangos de atención** (bloques celestes) = disponibilidad del doctor
2. **Click en rango** = crear cita con hora pre-seleccionada
3. **Citas prioritarias** = tab separado, sin hora, por orden de llegada

## Flujo Real de la Recepcionista
1. Selecciona SEDE (obligatorio) → carga doctores de esa sede
2. Selecciona ESPECIALIDAD (opcional) → filtra doctores
3. Selecciona PROFESIONAL (autocomplete con vigencia)
4. Calendario carga automáticamente: rangos + citas + otros eventos
5. Click en espacio DENTRO de rango → modal crear cita con hora pre-seleccionada

## Colores del Calendario
| Tipo | Color | Hex |
|------|-------|-----|
| Rango de atención (disponible) | Celeste | #eef4f7 |
| Cita programada | Rosado | #fcb6c1 |
| Otro evento | Lila | #cccfff |
| Citas misma hora (conflicto) | Amarillo | #fee451 |

## Restricciones OBLIGATORIAS
1. Rangos de atención DEBEN ser visibles (fondo celeste en celdas disponibles)
2. Celdas fuera de rango = doctor NO atiende (gris/deshabilitado)
3. Sede seleccionada ANTES de mostrar doctores
4. Vigencia del profesional visible: "(Marzo 10/2015 - Junio 16/2028)"
5. Duración de cita variable por doctor/especialidad/tipo
6. Tab "Citas Prioritarias" (sin hora, por orden de llegada)
7. Click-en-rango-para-crear = patrón crítico de productividad

## Endpoints Clave
- POST /citPatientServices/doCalendar → rangos + citas + eventos
- POST /citPatientServices/createEvent → crear cita
- POST /citPatientServices/stablishFinalTime → calcular hora fin
- POST /citPatientServices/getPrioritiyEvents → citas prioritarias
- POST /citPatientServices/getCitEventDuration → duraciones disponibles
