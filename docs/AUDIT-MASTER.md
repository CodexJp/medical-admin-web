# AUDIT MASTER -- MedicalAdmin Mockups

**Fecha:** 2026-04-08
**Archivos auditados:** 61 mockups + 5 reference/utility files (66 total)
**Agentes ejecutados:** 7

## Executive Summary

Los 61 mockups HTML cubren la estructura principal de los 19 requerimientos del PRD y los 9 additionals (A01-A09). Sin embargo, la auditoria revela **tres problemas sistemicos** que impiden la publicacion en Vercel y la demo al equipo:

1. **Dos sistemas de diseno coexistentes**: 9 archivos "Gen-1" usan ~1,500 lineas de CSS custom properties con paleta Neutral, mientras que 50+ archivos "Gen-2" usan Tailwind CDN nativo con paleta Zinc. Esto genera inconsistencia visual y viola la regla del proyecto ("usar Tailwind CDN, nunca CSS custom manual"). Los 9 archivos Gen-1 necesitan reescritura completa.

2. **Navegacion inter-modular rota**: Ningun journey de usuario es navegable end-to-end. Los mockups funcionan como islas independientes -- cada modulo se ve bien por separado, pero las transiciones criticas entre pasos (hc-main a finalizar, post-confirmacion a atencion, select-format a hc-main) no tienen enlaces funcionales. Se identificaron 14 dead-ends y 3 links rotos.

3. **Gaps funcionales significativos en POS/FAR**: Los modulos de facturacion (admin-facturas al 50%, crear-orden al 65%) y farmacia (inventario al 45%, despacho al 60%) tienen vistas completas faltantes (vista Info Factura con 6 tabs, vista Info Orden con 6 tabs, descarga masiva RIPS, despacho por lotes). Los modulos CIT y HIS estan en mucho mejor estado (~85-92% de paridad).

**Recomendacion**: Ejecutar Fase 3 de correccion en 4 batches: (1) Reescritura CSS de 9 archivos Gen-1, (2) Cableado de navegacion en 14 dead-ends, (3) Completar gaps funcionales por modulo, (4) Agregar estados faltantes (empty/error/loading).

---

## Scoreboard por Modulo

| Modulo | Archivos | Design System | Navegacion | Funcional | UX Journey | Score Total |
|--------|----------|---------------|------------|-----------|------------|-------------|
| 00-shell (login, shell, dashboards, cmd-palette) | 6 | ❌ Fail (3/6 Gen-1) | ⚠️ Partial (login siempre va a medico) | ⚠️ Partial (login sin error states) | ⚠️ Partial | ⚠️ |
| 01-calendar | 3 | ❌ Fail (3/3 Gen-1) | ⚠️ Partial (modal sin salida) | ⚠️ Partial (faltan 4 campos, 2 estados) | ⚠️ Partial | ❌ |
| 02-appointments | 5 | ✅ Pass (4/5) | ⚠️ Partial (cita-masiva sin sidebar) | ✅ Pass (R03-R05 completos) | ✅ Pass | ⚠️ |
| 03-reception | 5 | ❌ Fail (3/5 Gen-1) | ⚠️ Partial (3 links rotos, sin link a atencion) | ⚠️ Partial (facturacion incompleta) | ⚠️ Partial | ❌ |
| 04-clinical | 18 | ⚠️ Partial (10/18) | ⚠️ Partial (cadena finalizacion rota) | ⚠️ Partial (7 momentos OK, 8 gaps P1-P2) | ⚠️ Partial | ⚠️ |
| 05-medical-config | 5 | ⚠️ Partial (3/5, index sin Tailwind) | ✅ Pass | ⚠️ Partial (servicios: campos condicionales) | ✅ Pass | ⚠️ |
| 06-pharmacy | 2 | ✅ Pass | ✅ Pass (via sidebar) | ❌ Fail (despacho 60%, inventario 45%) | ❌ Fail | ❌ |
| 07-billing | 10 | ⚠️ Partial (8/10) | ⚠️ Partial (sin acciones en filas) | ❌ Fail (facturas 50%, orden sin vista info) | ❌ Fail | ❌ |
| 08-whatsapp | 4 | ✅ Pass | ✅ Pass | ✅ Pass | ⚠️ Partial (sin link desde recepcion) | ✅ |
| 09-settings | 1 | ❌ Fail (Gen-1) | ✅ Pass | ✅ Pass (5 secciones completas) | ✅ Pass | ⚠️ |
| Reference (_component-library, etc.) | 5 | ❌ Fail (4/5 sin Tailwind) | N/A | N/A | N/A | ❌ |

---

## P0 -- BLOCKERS (Impiden publicacion en Vercel)

### P0-DS: Design System Blockers

| # | Archivo | Issue | Fix |
|---|---------|-------|-----|
| 1 | `00-shell/shell.html` | ~1,506 lineas CSS custom, 375 var() refs, 1 clase zinc, paleta Neutral | Reescribir HTML con Tailwind usando dashboard-medico.html como template |
| 2 | `00-shell/login.html` | ~1,480 lineas CSS custom, paleta Neutral | Reescribir con Tailwind |
| 3 | `00-shell/command-palette.html` | ~1,497 lineas CSS custom, paleta Neutral | Reescribir con Tailwind |
| 4 | `01-calendar/estados.html` | ~1,488 lineas CSS custom, paleta Neutral | Reescribir con Tailwind |
| 5 | `01-calendar/popover-cita.html` | ~1,480 lineas CSS custom, 389 var() refs | Reescribir con Tailwind |
| 6 | `01-calendar/index.html` | Hibrido: ~1,694 lineas CSS + 123 clases zinc. Sidebar con CSS custom | Reescribir con Tailwind |
| 7 | `03-reception/estados.html` | ~1,495 lineas CSS custom, paleta Neutral | Reescribir con Tailwind |
| 8 | `03-reception/post-confirmacion.html` | ~1,499 lineas CSS custom, paleta Neutral | Reescribir con Tailwind |
| 9 | `03-reception/recepcion-form-chile.html` | ~1,507 lineas CSS custom, paleta Neutral | Reescribir con Tailwind |
| 10 | `09-settings/settings.html` | ~1,519 lineas CSS custom, paleta Neutral | Reescribir con Tailwind |
| 11 | `05-medical-config/index.html` | Sin Tailwind CDN, usa _design-tokens.css | Agregar CDN + convertir a Tailwind |
| 12 | `index.html` (root hub) | Sin Tailwind CDN, CSS custom properties | Agregar CDN + convertir a Tailwind |
| 13 | `_component-library.html` | Sin Tailwind CDN, usa _design-tokens.css | Agregar CDN + convertir a Tailwind |
| 14 | `_component-library-v2.html` | Sin Tailwind CDN, inline design tokens con hex Neutral | Agregar CDN + convertir a Tailwind |

### P0-NAV: Navigation Blockers

| # | Archivo | Issue | Fix |
|---|---------|-------|-----|
| 1 | `03-reception/recepcion-form.html` | Link roto: `../00-shell/dashboard.html` (no existe) | Cambiar a `../00-shell/dashboard-medico.html` |
| 2 | `03-reception/post-confirmacion.html` | Link roto: `../00-shell/dashboard.html` (no existe) | Cambiar a `../00-shell/dashboard-medico.html` |
| 3 | `03-reception/recepcion-form-chile.html` | Link roto: `../00-shell/dashboard.html` (no existe) | Cambiar a `../00-shell/dashboard-medico.html` |
| 4 | `04-clinical/select-format-sheet.html` | 5 botones "Seleccionar" sin onclick/href -- dead-end | Agregar `onclick="window.location.href='hc-main.html'"` |
| 5 | `04-clinical/hc-main.html` | Boton "FINALIZAR ATENCION" sin onclick -- dead-end | Agregar `onclick` a `finalizar-atencion.html` |
| 6 | `04-clinical/finalizar-atencion.html` | Sin navegacion de salida -- dead-end | Agregar boton "Continuar" a `post-finalizacion.html` |
| 7 | `04-clinical/post-finalizacion.html` | "Volver a Atencion" sin href -- dead-end | Convertir en `<a href="welcome.html">` |
| 8 | `04-clinical/format-list.html` | "Nuevo Formato" sin onclick, filas sin onclick -- dead-end | Agregar onclick a `format-builder.html` |
| 9 | `07-billing/crear-orden.html` | Formulario completo sin boton submit/guardar -- dead-end | Agregar boton sticky "Crear Orden" |

### P0-FUNC: Functional Blockers

| # | Archivo | Issue | Fix |
|---|---------|-------|-----|
| 1 | `07-billing/admin-facturas.html` | Vista Info Factura con 6 tabs FALTA COMPLETAMENTE. Wizard crear factura (4 tabs) FALTA. Panel calculos 7 valores FALTA. Modal NC/ND FALTA. 9 acciones por factura FALTAN | Crear mockup completo de vista detalle factura + wizard creacion |
| 2 | `07-billing/crear-orden.html` | Vista Info Orden con 6 tabs FALTA COMPLETAMENTE (donde se pasa 80% del tiempo). Modal agregar items FALTA | Crear mockup vista detalle orden existente |
| 3 | `07-billing/rips.html` | Naming de tabs INCORRECTO: AP deberia ser Procedimientos (no Consultas), AC deberia ser Consultas (no Procedimientos), US deberia ser Usuarios (no Urgencias), AD deberia ser Ajuste (no Recien Nacidos) | Renombrar las 4 tabs incorrectas |
| 4 | `07-billing/rips.html` | Modal descarga masiva ZIP FALTA (12+ campos, barra progreso, critico para COL) | Crear mockup modal descarga |
| 5 | `06-pharmacy/despacho.html` | Panel busqueda tiene ~3 de 9 campos legacy. Despacho manual por lotes FALTA. Calculo moderacion/copago FALTA | Completar panel busqueda + crear vistas faltantes |

### P0-FLOW: Journey Blockers

| # | Journey | Issue | Fix |
|---|---------|-------|-----|
| 1 | J1: Dia del Medico | Dashboard medico NO tiene lista de pacientes del dia clickeable. Solo stats y tabla historica sin acciones | Agregar widget "Pacientes pendientes" con click a welcome.html |
| 2 | J1: Dia del Medico | Cadena finalizacion completamente rota (3 dead-ends consecutivos: hc-main, finalizar, post-finalizacion) | Cablear los 3 enlaces (ver P0-NAV 5-7) |
| 3 | J2: Dia Recepcionista | login.html siempre redirige a dashboard-medico. No hay selector de rol | Agregar selector de rol o links a los 3 dashboards |
| 4 | J5: Cross-Module | 7 de 13 pasos rotos. post-confirmacion no tiene "Ir a Atencion". No hay links cross-module farmacia-facturacion | Cablear transiciones (ver P0-NAV) + agregar CTA "Iniciar Atencion" |

---

## P1 -- CRITICAL (Deben resolverse antes de demo al equipo)

### P1-DS: Design System Critical

| # | Issue | Archivos afectados | Fix |
|---|-------|-------------------|-----|
| 1 | Font Satoshi configurada como heading font (deberia ser Inter exclusivamente) | shell, login, command-palette, cal/estados, cal/popover-cita, rec/estados, rec/post-confirmacion, rec/recepcion-form-chile, settings, hc-main, index, _component-library (13 archivos) | Eliminar refs a Satoshi, usar Inter para todo |
| 2 | CSS variables usan hex Neutral en vez de Zinc (#E5E5E5 vs #E4E4E7, #262626 vs #18181b) | Los 9 Gen-1 + _component-library-v2, cal/index, medical-config/index (12 archivos) | Corregir hex a Zinc si se conservan CSS vars |
| 3 | Cards sin `shadow-sm` | cita-masiva, finalizar-atencion, question-properties, welcome (4 archivos) | Agregar `shadow-sm` a containers card |
| 4 | Cards con `border-zinc-200` solido sin `/60` transparencia | cita-masiva, finalizar-atencion, format-preview, loading, question-properties, select-format-sheet, welcome (7 archivos) | Cambiar a `border-zinc-200/60` |
| 5 | `_sidebar-canonical.html` sin Tailwind CDN | _sidebar-canonical.html | Agregar CDN o documentar como template CSS intencional |
| 6 | Sidebar logo con gradiente purple/blue en settings/shell vs solid bg-zinc-900 en dashboards | shell.html, settings.html | Unificar a bg-zinc-900 |

### P1-NAV: Navigation Critical

| # | Issue | Archivo | Fix |
|---|-------|---------|-----|
| 1 | `post-confirmacion.html` sin CTA "Ir a Atencion" en body (solo accesible via sidebar) | 03-reception/post-confirmacion.html | Agregar boton "Iniciar Atencion" a `../04-clinical/welcome.html` |
| 2 | `cita-masiva.html` sin sidebar (unico archivo no-clinical sin shell) | 02-appointments/cita-masiva.html | Agregar sidebar completo |
| 3 | `format-list.html` sin boton "Crear Formato" funcional | 04-clinical/format-list.html | Agregar link a format-builder.html |
| 4 | Solo 5 de ~48 archivos con sidebar tienen `nav-item active` correcto | ~43 archivos | Configurar clase active en cada archivo |
| 5 | WhatsApp no accesible desde flujo de recepcion | 03-reception/index.html, post-confirmacion.html | Agregar boton "Enviar recordatorio WhatsApp" |

### P1-FUNC: Functional Critical

| # | Req | Issue | Archivo | Fix |
|---|-----|-------|---------|-----|
| 1 | R04 | Seccion Facturacion (S5) del form recepcion: verificar 16+ campos legacy (B1-B16) | recepcion-form.html | Validar/completar campos facturacion |
| 2 | R06 | Panel alertas/validaciones en sidebar derecha de HC FALTA | hc-main.html | Agregar tab "Alertas" con badge, lista campos obligatorios pendientes |
| 3 | R06 | Seccion formatos en sidebar con Seleccionar/Reanudar/Eliminar FALTA | hc-main.html | Agregar lista formatos temporales con acciones |
| 4 | R06 | Tercer estado auto-save ("Sin guardar - reintentando") FALTA | hc-main.html | Agregar estado rojo con retry (UX spec lo exige) |
| 5 | R06 | Checkboxes diagnostico evento/procedimiento/infeccion novo FALTAN | select-format-sheet.html | Agregar 3 checkboxes |
| 6 | R01 | Input de fecha directa para saltar a fecha especifica FALTA | 01-calendar/index.html | Agregar date input en toolbar |
| 7 | R04 | Accion "Marcar Inasistencia" separada de Cancelar FALTA | 03-reception/index.html | Agregar boton especifico |
| 8 | R04 | Campo Tipo Usuario FALTA en recepcion y wizard | recepcion-form.html, wizard-cita.html | Agregar campo |
| 9 | R04 | Modal seleccion Convenio con filtro texto FALTA | recepcion-form.html | Crear mockup modal |
| 10 | R04 | PDFs completos en post-confirmacion: PDF Orden, Recibo Caja (con selector), Factura Res506 | post-confirmacion.html | Agregar 3 acciones PDF |
| 11 | A01 | Login sin error states (wrong password, account locked, server error) | login.html | Agregar al menos 3 variantes de error |
| 12 | R07 | Inventario: vista completa de creacion FALTA (tipo transaccion, bodega origen/destino, proveedor, busqueda articulos, IVA/descuento) | inventario.html | Reescribir con vista completa |
| 13 | R09 | Servicios: campos condicionales FALTAN (Codigo SAP, Codigo Concepto RIPS, Grupo servicio COL) | servicios.html | Agregar campos condicionales |
| 14 | R07 | Despacho: wizard crear formulacion simplificado (falta paso convenio, cliente, bodega, stock, frecuencia, forma farmaceutica) | despacho.html | Completar wizard 4 pasos |
| 15 | R13 | Acciones en tabla admin-facturas FALTAN (ver detalle, editar, anular, imprimir) | admin-facturas.html | Agregar acciones por fila |

### P1-FLOW: Journey Critical

| # | Issue | Fix |
|---|-------|-----|
| 1 | Dashboard medico sin "Buenos dias" greeting (los otros 2 dashboards lo tienen) | Agregar greeting |
| 2 | Sidebar WhatsApp muestra menu admin-level cuando podria ser accedido por medico | Adaptar sidebar al rol |
| 3 | question-properties.html sin breadcrumb/back a format-builder | Agregar breadcrumb |

---

## P2 -- MAJOR (Resolver para calidad production-ready)

### P2-DS: Design System Major

| # | Issue | Archivos | Fix |
|---|-------|----------|-----|
| 1 | Boton height `h-10` en vez de `h-9` | post-finalizacion.html, crear-orden.html, rips.html | Cambiar a h-9 |
| 2 | 248 ocurrencias de `rounded-lg` (deberia ser `rounded-xl` para cards, `rounded-md` para botones) | Codebase amplio | Auditar y reemplazar caso por caso |
| 3 | Custom CSS para toggle (8 lineas) | diagnosticos-medico.html | Convertir a Tailwind |
| 4 | 86 lineas custom CSS (sidebar icons, layout, scrollbar) | hc-main.html | Minimizar, usar Tailwind donde posible |
| 5 | 44 lineas custom CSS para loading animations | loading.html | Usar Tailwind animate-pulse donde posible |
| 6 | 40 lineas custom CSS para dental chart | odontograma.html | Mantener SVG CSS, usar Tailwind grid para layout |
| 7 | 38 lineas custom CSS para form layout | recepcion-form.html | Usar Tailwind grid/border |
| 8 | Dashboard-admin tiene boton "Contraste" que medico/recepcionista no tienen | dashboards | Agregar a los 3 dashboards |
| 9 | Header search bar width inconsistente (w-80 vs flex-1 max-w-md vs token-based) | Cross-module | Unificar approach |

### P2-NAV: Navigation Major

| # | Issue | Fix |
|---|-------|-----|
| 1 | ~43 archivos sin `nav-item active` en sidebar | Configurar active state en cada archivo |
| 2 | Dashboard medico/admin: widgets sin links clickeables a modulos (solo sidebar) | Agregar links en body content |
| 3 | Breadcrumb con 3 variantes de navegacion FALTA en welcome y hc-main (atencion/HC externa/enfermeria) | Agregar breadcrumb contextual |

### P2-FUNC: Functional Major

| # | Req | Issue | Archivo |
|---|-----|-------|---------|
| 1 | R01 | Vista "Todos los profesionales" multi-doctor con scroll horizontal | calendar/index.html |
| 2 | R04 | Campo Via Acceso Urgencias (COL + Res.2275) | recepcion-form.html |
| 3 | R04 | Campo Justificacion Cambio Tipo Evento (textarea condicional) | recepcion-form.html |
| 4 | R04 | Campo Raza (cascada desde Grupo Raza) + texto "Otro" | recepcion-form.html |
| 5 | R04 | Campo Nivel/Prevision/CEP (adaptable por pais) | recepcion-form.html |
| 6 | R06 | Modal embarazo (FUM, alto riesgo, finalizar, fecha fin) | modales-hc.html |
| 7 | R06 | Tab "Despacho Articulos" condicional (FAR) | hc-main.html |
| 8 | R06 | Error states: fallo guardado, timeout API, desconexion red | hc-main.html |
| 9 | R06 | Loading en select-format (spinner si 0 formatos) | select-format-sheet.html |
| 10 | R06 | Validation inline (borde rojo + mensaje bajo campo) | hc-main.html |
| 11 | R13 | Modal agregar items (filtro area, toggle serv/med, tabla dual, MIPRES) | crear-orden.html |
| 12 | R14 | Panel busqueda facturas: 4 campos condicionales (Estado SICO, Fac Electronica, Estado RIPS, Resolucion RIPS) | admin-facturas.html |
| 13 | R15 | Porcentaje global + 8 porcentajes por tipo servicio | tarifas.html |
| 14 | R16 | Busqueda por principio activo, presentaciones, principios activos asociados | plm.html |
| 15 | R18 | Validar 11 secciones de convenios contra God Entity PosContract (100+ campos) | convenios.html |
| 16 | R07 | Despacho manual por lotes (seleccion lotes especificos) | despacho.html |
| 17 | R07 | Calculo moderacion/copago (formulario completo) | despacho.html |
| 18 | CIT | Campo Tipo Cita en tabla recepcion y prioritarias | reception/index.html, calendar/index.html |
| 19 | CIT | Tipo Cita/Evento en modal cita masiva | cita-masiva.html |
| 20 | CIT | Crear mockup Admin Razones Cancelacion (en sidebar pero sin pagina) | Nuevo archivo |
| 21 | R10 | Campo "Complejidad" y relacion con MedService | procedimientos.html |
| 22 | N/A | Notification badge count inconsistente entre dashboards (5/12/3) -- intencional pero verificar | dashboards |

### P2-FLOW: Journey Major

| # | Issue | Fix |
|---|-------|-----|
| 1 | Empty states ausentes en: reception/index, admin-facturas, format-list, despacho, WhatsApp pages | Agregar estado vacio a cada uno |
| 2 | Error states ausentes en TODOS los mockups (0 de 61 tienen error state) | Crear al menos 1 error generico (toast/alert) reutilizable |
| 3 | Loading states: solo loading.html (clinical) existe | Agregar loading state a calendario y recepcion |
| 4 | cita-masiva.html es placeholder sin contenido completo | Completar mockup |
| 5 | Back navigation ausente en hc-main.html y finalizar-atencion.html | Agregar boton "Volver" |

---

## P3 -- MINOR (Polish)

### P3-DS: Design System Polish

| # | Issue | Archivos |
|---|-------|----------|
| 1 | 29 lineas custom CSS drag-and-drop (necesario) | format-builder.html |
| 2 | 36 lineas custom CSS scrollbar + sidebar indicators | format-list.html |
| 3 | 29 lineas custom CSS drag handle, panel layout | question-properties.html |
| 4 | 30 lineas custom CSS sheet animation/overlay | select-format-sheet.html |
| 5 | 31 lineas custom CSS welcome illustration/grid | welcome.html |
| 6 | 33 lineas custom CSS chat bubbles (necesario) | whatsapp-log.html |
| 7 | ~25 lineas sidebar collapse CSS duplicado en ~50 archivos con variaciones menores | Cross-module -- centralizar |
| 8 | Medico KPI 3 columnas vs recepcionista/admin 4 columnas (aceptable pero inconsistente) | dashboards |
| 9 | Settings sidebar logo con gradiente vs solid en dashboards | settings.html |

### P3-FUNC: Functional Polish

| # | Issue | Archivos |
|---|-------|----------|
| 1 | Campos multi-pais condicionales: Digito Verificacion CHL, CURP MEX, Tipo Persona CHL/MEX, Campos GEM SG/ZA | recepcion-form, wizard-cita |
| 2 | Panel Historial Citas del paciente en calendario | calendar/index.html |
| 3 | Estado "Sin rangos para el doctor" en grilla semanal | calendar/index.html |
| 4 | Preview cantidad de citas a crear en modal masiva | cita-masiva.html |
| 5 | Modal Cambiar Convenio en recepcion | recepcion-form.html |
| 6 | Admin Tipos Cita (CRUD simple, baja prioridad) | Nuevo archivo |
| 7 | Tab "Tablas y Graficos" historico en HC | hc-main.html |
| 8 | Sub-tab "Formulas Consultorio" condicional | hc-main.html |
| 9 | Seccion Tissue Analytics condicional | hc-main.html |
| 10 | Modalidad atencion dropdown en sidebar HC | hc-main.html |
| 11 | Boton "Liberar turno" condicional (applyTurn) | welcome.html |
| 12 | Leyenda capability badges en select-format | select-format-sheet.html |
| 13 | 4 capability badges faltantes (SDS, LDC, MEG, OTP) | select-format-sheet.html |
| 14 | Firma digital A1 Brasil | post-finalizacion.html |
| 15 | Generacion masiva PDF | post-finalizacion.html |
| 16 | Busquedas recientes en Command Palette | command-palette.html |
| 17 | Empresa/sede selector post-login multi-tenant | login.html |
| 18 | Componente reutilizable OccupationSearch (usado en 5+ modulos) | ocupaciones.html |
| 19 | Medios de pago: campos Codigo condicion, Codigo SICO, Requiere confirmacion | medios-pago.html |
| 20 | Rangos facturacion: campos completos (prefijo, consecutivos, resolucion DIAN) | rangos-facturacion.html |
| 21 | Modales compartidos reutilizables: contrato, ocupacion, CIE-10, recibo caja | Nuevo archivo |

---

## Fix Plan -- Agentes de Correccion Propuestos

### Batch 1: CSS Rewrite (9 archivos Gen-1 + 4 sin Tailwind CDN)

**Archivos Gen-1 (reescritura completa del body HTML)**:
1. `00-shell/shell.html` -- Effort: ALTO (sidebar + header + content)
2. `00-shell/login.html` -- Effort: MEDIO (form standalone)
3. `00-shell/command-palette.html` -- Effort: MEDIO (overlay)
4. `01-calendar/estados.html` -- Effort: MEDIO (state reference)
5. `01-calendar/popover-cita.html` -- Effort: BAJO (small popover)
6. `01-calendar/index.html` -- Effort: ALTO (full calendar + sidebar CSS)
7. `03-reception/estados.html` -- Effort: MEDIO (state reference)
8. `03-reception/post-confirmacion.html` -- Effort: MEDIO (confirmation)
9. `03-reception/recepcion-form-chile.html` -- Effort: MEDIO (form variant)
10. `09-settings/settings.html` -- Effort: ALTO (full settings page)

**Archivos sin Tailwind CDN (agregar CDN + convertir CSS)**:
11. `05-medical-config/index.html` -- Effort: MEDIO
12. `index.html` (root) -- Effort: MEDIO
13. `_component-library.html` -- Effort: BAJO (reference)
14. `_component-library-v2.html` -- Effort: BAJO (reference)

**Template de referencia**: `00-shell/dashboard-medico.html`
**Estrategia**: No parchear. Reconstruir el body HTML de cada archivo usando Tailwind classes, copiando solo la estructura de contenido del original. Reemplazar el bloque CSS de ~1,500 lineas por los ~25 lineas de sidebar collapse CSS estandar.
**Effort estimado**: 3-4 horas agente (paralelizable)

**Ademas en este batch**:
- Eliminar refs a Satoshi en 13 archivos (find & replace)
- Agregar `shadow-sm` a cards en 4 archivos
- Cambiar `border-zinc-200` a `border-zinc-200/60` en 7 archivos
- Unificar sidebar logo a bg-zinc-900 en shell/settings

### Batch 2: Flow Wiring (dead-ends y cross-module)

**Archivos a cablear (agregar onclick/href)**:

| Archivo | Accion | Destino |
|---------|--------|---------|
| `select-format-sheet.html` | 5 botones "Seleccionar" | `hc-main.html` |
| `hc-main.html` | Boton "FINALIZAR ATENCION" | `finalizar-atencion.html` |
| `finalizar-atencion.html` | Agregar boton "Continuar" | `post-finalizacion.html` |
| `post-finalizacion.html` | "Volver a Atencion" | `welcome.html` + `../01-calendar/index.html` |
| `format-list.html` | "Nuevo Formato" + filas tabla | `format-builder.html` |
| `crear-orden.html` | Agregar boton submit sticky | N/A (submit) |
| `login.html` | Agregar selector de rol o links | 3 dashboards |
| `post-confirmacion.html` | Agregar CTA "Iniciar Atencion" | `../04-clinical/welcome.html` |
| `recepcion-form.html` | Fix breadcrumb link roto | `../00-shell/dashboard-medico.html` |
| `recepcion-form-chile.html` | Fix breadcrumb link roto | `../00-shell/dashboard-medico.html` |
| `dashboard-medico.html` | Agregar widget "Pacientes pendientes" clickeable | `../04-clinical/welcome.html` |
| `admin-facturas.html` | Agregar acciones por fila (ver, editar, anular, imprimir) | Vista detalle (si existe) |
| `cita-masiva.html` | Agregar sidebar completo | N/A (layout) |

**Sidebar active state**: Configurar `nav-item active` en ~43 archivos.
**Effort estimado**: 2-3 horas agente (mayormente mecanico)

### Batch 3: Functional Gaps per Module

#### CIT (Calendario + Appointments + Recepcion)
- Agregar input fecha directa en toolbar calendario
- Agregar accion "Marcar Inasistencia" en tabla recepcion
- Agregar campo Tipo Usuario en recepcion-form y wizard-cita
- Agregar modal seleccion Convenio en recepcion-form
- Completar acciones PDF en post-confirmacion (PDF Orden, Recibo Caja, Factura Res506)
- Agregar campos: Raza cascada, Nivel/Prevision/CEP en recepcion-form
- Completar tipo cita en tablas de recepcion y prioritarias

#### HIS (Historia Clinica)
- Agregar panel alertas/validaciones en sidebar derecha de hc-main
- Agregar seccion formatos con Seleccionar/Reanudar/Eliminar en sidebar hc-main
- Agregar tercer estado auto-save ("Sin guardar") en hc-main
- Agregar 3 checkboxes (dx evento/procedimiento/infeccion novo) en select-format-sheet
- Agregar modal embarazo en modales-hc
- Agregar breadcrumb contextual (3 variantes) en welcome y hc-main
- Agregar tab condicional "Despacho Articulos" en hc-main

#### POS (Facturacion)
- **CRITICO**: Crear vista Info Factura con 6 tabs en admin-facturas
- **CRITICO**: Crear vista Info Orden con 6 tabs en crear-orden (o archivo nuevo)
- **CRITICO**: Corregir naming tabs RIPS (AP=Procedimientos, AC=Consultas, US=Usuarios, AD=Ajuste)
- Crear modal descarga masiva RIPS ZIP (12+ campos)
- Agregar wizard crear factura (4 tabs) en admin-facturas
- Agregar modal NC/ND en admin-facturas
- Agregar modal agregar items en crear-orden
- Completar campos condicionales RIPS/SICO/Res506 en admin-facturas
- Agregar porcentaje global + 8 por tipo servicio en tarifas
- Completar busqueda PLM (principio activo, presentaciones)
- Validar 11 secciones convenios vs God Entity

#### FAR (Farmacia)
- Completar panel busqueda despacho (9 campos)
- Crear vista despacho manual por lotes
- Crear formulario calculo moderacion/copago
- Completar wizard prescripcion (convenio, cliente, bodega, stock, frecuencia, forma farmaceutica)
- Reescribir inventario con vista completa de creacion (tipo transaccion, movimiento, bodega, proveedor)
- Crear vista Info Movimiento (detalle con tabla articulos, totales, acciones PDF/SAP)

#### MED (Config Medica)
- Agregar campos condicionales en servicios (Codigo SAP, RIPS, Grupo servicio COL)
- Agregar campo Complejidad en procedimientos

**Effort estimado**: 6-8 horas agente (POS y FAR son los mas intensivos)

### Batch 4: Missing States

**Error states** (crear 1 toast generico reutilizable + variantes por modulo):
- login.html: wrong password, account locked, server error (3 variantes)
- hc-main.html: fallo guardado auto-save, timeout API, desconexion red
- Todas las tablas: error al cargar datos

**Empty states** (agregar a archivos que solo muestran datos):
- 03-reception/index.html: "Sin pacientes para hoy"
- 07-billing/admin-facturas.html: "No se encontraron facturas"
- 04-clinical/format-list.html: "No hay formatos creados"
- 06-pharmacy/despacho.html: "No hay formulaciones pendientes"
- 08-whatsapp/* (4 archivos): estados vacios por seccion
- 07-billing/crear-orden.html: resultados busqueda vacios

**Loading states** (agregar skeleton/spinner):
- 01-calendar/index.html: carga de grilla
- 03-reception/index.html: carga de lista
- 04-clinical/select-format-sheet.html: carga de formatos
- 06-pharmacy/inventario.html: carga de movimientos
- Todas las tablas POS (5+ archivos)

**Effort estimado**: 2-3 horas agente

---

## Appendix: File-by-File Status

| File | DS | Nav | Func | Journey | Priority Issues |
|------|-----|-----|------|---------|----------------|
| `00-shell/command-palette.html` | ❌ Gen-1 | ✅ | ⚠️ | -- | P0: CSS rewrite. P3: busquedas recientes faltantes |
| `00-shell/dashboard-admin.html` | ✅ | ✅ | ✅ | ⚠️ | P2: body links sparse. P1: Contraste button OK |
| `00-shell/dashboard-medico.html` | ✅ | ⚠️ | ⚠️ | ❌ | P0: sin lista pacientes pendientes. P1: sin greeting. Template de referencia DS |
| `00-shell/dashboard-recepcionista.html` | ✅ | ✅ | ✅ | ⚠️ | P2: sin boton WhatsApp |
| `00-shell/login.html` | ❌ Gen-1 | ⚠️ | ⚠️ | ❌ | P0: CSS rewrite. P0: siempre va a medico. P1: sin error states |
| `00-shell/shell.html` | ❌ Gen-1 | ✅ | ✅ | -- | P0: CSS rewrite. Reference file |
| `01-calendar/estados.html` | ❌ Gen-1 | ✅ | ✅ | -- | P0: CSS rewrite |
| `01-calendar/index.html` | ❌ Hybrid | ⚠️ | ⚠️ | ⚠️ | P0: CSS rewrite. P1: sin date input directo. P2: sin vista multi-doctor |
| `01-calendar/popover-cita.html` | ❌ Gen-1 | ✅ | ✅ | -- | P0: CSS rewrite |
| `02-appointments/admin-consultorios.html` | ✅ | ✅ | ✅ | ✅ | Ninguno critico |
| `02-appointments/admin-duraciones.html` | ✅ | ✅ | ✅ | ✅ | Ninguno critico. Paridad COMPLETA |
| `02-appointments/admin-horarios.html` | ✅ | ✅ | ✅ | ✅ | P3: campo "Permite Citas Masivas" |
| `02-appointments/cita-masiva.html` | ⚠️ sin shadow-sm | ❌ sin sidebar | ⚠️ | -- | P1: agregar sidebar. P2: tipo cita/evento faltante |
| `02-appointments/wizard-cita.html` | ✅ | ✅ | ⚠️ | ✅ | P1: campo Tipo Usuario. P3: campos multi-pais |
| `03-reception/estados.html` | ❌ Gen-1 | ✅ | ✅ | -- | P0: CSS rewrite |
| `03-reception/index.html` | ✅ | ✅ | ⚠️ | ⚠️ | P1: sin accion Inasistencia. P2: empty state. P2: sin WhatsApp |
| `03-reception/post-confirmacion.html` | ❌ Gen-1 | ⚠️ | ⚠️ | ⚠️ | P0: CSS rewrite + link roto. P1: sin CTA atencion. P1: PDFs incompletos |
| `03-reception/recepcion-form-chile.html` | ❌ Gen-1 | ⚠️ | ⚠️ | -- | P0: CSS rewrite + link roto |
| `03-reception/recepcion-form.html` | ⚠️ 38ln CSS | ⚠️ | ⚠️ | ✅ | P0: link roto. P1: verificar facturacion 16+ campos. P2: custom CSS |
| `04-clinical/carga-archivo.html` | ✅ | -- | ⚠️ | -- | P3: upload progress faltante. Component showcase |
| `04-clinical/diagnosticos-enfermeria.html` | ✅ | -- | ✅ | -- | Component showcase. Sin issues |
| `04-clinical/diagnosticos-medico.html` | ⚠️ 8ln CSS | -- | ✅ | -- | P2: custom CSS toggle. Component showcase |
| `04-clinical/finalizar-atencion.html` | ⚠️ sin shadow | ❌ dead-end | ✅ | ❌ | P0: sin nav salida. P1: border transparency |
| `04-clinical/format-areas-crud.html` | ✅ | ✅ | ✅ | -- | Sin issues |
| `04-clinical/format-builder.html` | ⚠️ 29ln CSS | ✅ | ✅ | ⚠️ | P3: custom CSS drag-drop. Funcional OK |
| `04-clinical/format-list.html` | ⚠️ 36ln CSS | ❌ dead-end | ✅ | ❌ | P0: "Nuevo Formato" sin onclick. P3: custom CSS |
| `04-clinical/format-preview.html` | ⚠️ border solid | ✅ | ✅ | -- | P1: border-zinc-200/60 |
| `04-clinical/hc-main.html` | ⚠️ 86ln CSS | ❌ dead-end | ⚠️ | ❌ | P0: FINALIZAR sin onclick. P1: panel alertas, formatos sidebar, auto-save error. P2: tabs faltantes |
| `04-clinical/incapacidad.html` | ✅ | -- | ✅ | -- | Component showcase. Sin issues |
| `04-clinical/loading.html` | ⚠️ 44ln CSS, border | ✅ | ✅ | -- | P2: custom CSS. P2: timeout state faltante |
| `04-clinical/modales-hc.html` | ✅ | -- | ⚠️ | -- | P2: modal embarazo faltante. 7/21 legacy modales |
| `04-clinical/odontograma.html` | ⚠️ 40ln CSS | -- | ✅ | -- | P2: custom CSS SVG (justificado) |
| `04-clinical/ordenes-medicas.html` | ✅ | -- | ✅ | -- | Component showcase. 7/7 tipos ordenes |
| `04-clinical/post-finalizacion.html` | ✅ | ❌ dead-end | ⚠️ | ❌ | P0: sin nav funcional. P3: firma digital BRA, PDF masivo |
| `04-clinical/question-properties.html` | ⚠️ sin shadow, border | -- | ⚠️ | -- | P1: shadow-sm + border/60. P3: conditional logic GUI parcial |
| `04-clinical/select-format-sheet.html` | ⚠️ 30ln CSS, border | ❌ dead-end | ⚠️ | ❌ | P0: botones sin onclick. P1: checkboxes dx. P2: loading state |
| `04-clinical/tab-consentimiento.html` | ✅ | -- | ✅ | -- | Component showcase. Sin issues |
| `04-clinical/tab-historia-clinica.html` | ✅ | -- | ✅ | -- | Component showcase. Mejora sobre legacy (paginacion) |
| `04-clinical/tab-info-paciente.html` | ✅ | -- | ⚠️ | -- | P2: raza/grupo racial, modal embarazo, nivel |
| `04-clinical/welcome.html` | ⚠️ sin shadow, border | ✅ | ⚠️ | ✅ | P1: shadow-sm + border/60. P2: breadcrumb, liberar turno |
| `05-medical-config/checklist.html` | ✅ | ✅ | ✅ | -- | P3: confirmacion eliminacion. 90% completo |
| `05-medical-config/index.html` | ❌ sin CDN | ✅ | ✅ | -- | P0: agregar Tailwind CDN |
| `05-medical-config/ocupaciones.html` | ✅ | ✅ | ⚠️ | -- | P3: componente reutilizable, filtro estado |
| `05-medical-config/procedimientos.html` | ✅ | ✅ | ⚠️ | -- | P2: campo Complejidad, relacion MedService |
| `05-medical-config/servicios.html` | ✅ | ✅ | ⚠️ | -- | P1: campos condicionales (SAP, RIPS, Grupo COL) |
| `06-pharmacy/despacho.html` | ✅ | ✅ | ❌ | ❌ | P0: panel busqueda 3/9. P1: despacho lotes, copago, wizard incompleto |
| `06-pharmacy/inventario.html` | ✅ | ✅ | ❌ | -- | P1: vista creacion FALTA. P1: info movimiento FALTA. 45% completo |
| `07-billing/admin-facturas.html` | ✅ | ⚠️ | ❌ | ❌ | P0: vista Info Factura FALTA. P0: wizard crear FALTA. P1: acciones fila |
| `07-billing/clientes.html` | ✅ | ✅ | ⚠️ | -- | P3: verificar campos vs PosClient entity. 75% |
| `07-billing/convenios.html` | ✅ | ✅ | ⚠️ | -- | P2: validar 11 secciones vs God Entity. 70% |
| `07-billing/crear-orden.html` | ⚠️ h-10 | ❌ dead-end | ⚠️ | ❌ | P0: sin boton submit. P0: vista Info Orden FALTA. P2: modal items |
| `07-billing/medios-pago.html` | ✅ | ✅ | ⚠️ | -- | P3: campos codigo condicion, SICO, confirmacion |
| `07-billing/plm.html` | ✅ | ✅ | ⚠️ | -- | P2: busqueda principio activo, presentaciones. 60% |
| `07-billing/rangos-facturacion.html` | ✅ | ✅ | ⚠️ | -- | P3: verificar campos completos. 70% |
| `07-billing/rips.html` | ⚠️ h-10 tabs | ✅ | ⚠️ | ⚠️ | P0: naming tabs incorrecto (4 tabs). P0: modal descarga ZIP. P2: h-10 |
| `07-billing/tarifas-medicamentos.html` | ✅ | ✅ | ⚠️ | -- | P2: verificar paginacion server-side. 60% |
| `07-billing/tarifas.html` | ✅ | ✅ | ⚠️ | -- | P2: porcentaje global + 8 por tipo. 55% |
| `08-whatsapp/whatsapp-config.html` | ✅ | ✅ | ✅ | ✅ | Sin issues |
| `08-whatsapp/whatsapp-dashboard.html` | ✅ | ✅ | ✅ | ✅ | Sin issues |
| `08-whatsapp/whatsapp-log.html` | ⚠️ 33ln CSS | ✅ | ✅ | ✅ | P3: custom CSS chat bubbles (justificado) |
| `08-whatsapp/whatsapp-templates.html` | ✅ | ✅ | ✅ | ✅ | Sin issues |
| `09-settings/settings.html` | ❌ Gen-1 | ✅ | ✅ | ✅ | P0: CSS rewrite. 5 secciones funcionales completas |
| `_component-library.html` | ❌ sin CDN | -- | -- | -- | P0: agregar Tailwind CDN. Reference file |
| `_component-library-v2.html` | ❌ sin CDN | -- | -- | -- | P0: agregar Tailwind CDN. Reference file |
| `_sidebar-canonical.html` | ❌ sin CDN | -- | -- | -- | P1: agregar CDN o documentar. Template {{BASE}} vars |
| `_table-pattern.html` | ✅ | -- | -- | -- | Reference file. Compliant |
| `index.html` (root hub) | ❌ sin CDN | ✅ | ✅ | -- | P0: agregar Tailwind CDN. Links a 61 mockups OK |
