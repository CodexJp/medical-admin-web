# Prompt: Historia Clinica Temporal — Sub-tabs y Modales (04-clinical Part 2)

> Auto-contenido para Google Stitch u otro AI design tool.

## Contexto del Proyecto

MedicalAdmin es un sistema de gestion clinica para 6 paises latinoamericanos. Estamos modernizando de JSF/AngularJS a React 19 + shadcn/ui. Este prompt cubre los **sub-tabs y modales** de la Historia Clinica Temporal — la pantalla #1 del sistema, usada 20-40 veces/dia por cada medico.

## Design System

```css
font-family: 'Inter', system-ui, sans-serif;
font-size: 13px;
line-height: 18px;
letter-spacing: -0.31px;

/* Backgrounds (3 capas) */
--bg-surface: #FFFFFF;
--bg-panel: #FCFCFC;
--bg-muted: #F0F0F0;

/* Text (TailwindCSS Neutral) */
--text-heading: #262626;  /* neutral-800 */
--text-body: #525252;     /* neutral-600 */
--text-muted: #737373;    /* neutral-500 */

/* Borders & Radius */
--border: #E5E5E5;        /* neutral-200 */
border-radius: 8px (lg) / 12px (xl);
box-shadow: none o 0 1px 2px rgb(0 0 0 / 0.03);

/* Status Badges (pill: bg-color-50 + text-color-700) */
Confirmed: green | In-progress: amber | Urgent: red | Pending: neutral

/* Primary */
--primary: #2563EB;
--primary-light: #EFF6FF;
```

**Fonts**: Inter (body/UI) + Satoshi (headings)
**Icons**: Lucide (stroke: 0.8px)
**Nivel visual**: SaaS premium moderno (Cal.com, no enterprise arcaico)

## Arquitectura de Pantalla

La HC Temporal tiene:
- **78% izquierda**: Contenido principal con tabs de nivel superior y sub-tabs
- **22% derecha**: Sidebar fija con cronometro, resumen paciente, formatos, alertas

### Tabs nivel superior
1. Evento Actual (con sub-tabs dentro)
2. Info Paciente (read-only)
3. Historia Clinica (historial previo paginado)
4. Consentimiento Informado (firma digital)

### Sub-tabs dentro de "Evento Actual"
1. Evaluacion Formato (ya construido en Part 1)
2. **Diagnosticos Medico** — CIE-10 autocomplete, causa externa, finalidad, tabla diagnosticos
3. **Diagnosticos Enfermeria** — NANDA, condicional por formato
4. **Ordenes Medicas** — 7 tipos: Formulacion, Laboratorio, Radiologia, Procedimientos, PQX, Interconsulta, Incapacidad
5. **Odontograma** — Canvas con 32 dientes, toolbar de simbolos
6. **Carga de Archivo** — Dropzone drag&drop, tipos: PDF/JPG/PNG/DICOM
7. **Incapacidad** — Formulario con calculo auto de dias, historial

## Pantallas a Generar

### 1. Diagnosticos Medico
- Diagnostico principal (obligatorio): Autocomplete CIE-10 con busqueda
- Selects: Tipo diagnostico (Impresion/Confirmado/Recurrente), Causa externa, Finalidad consulta
- 3 diagnosticos relacionados (autocomplete CIE-10)
- Tabla de diagnosticos agregados con badges de tipo y acciones editar/eliminar
- Seccion condicional: Diagnostico de Procedimiento
- **Mock data**: E11.9 Diabetes, I10 Hipertension, J06.9 Infeccion respiratoria, E78.0 Hipercolesterolemia

### 2. Diagnosticos Enfermeria (condicional)
- Autocomplete NANDA con codigos
- Tabla de diagnosticos NANDA agregados
- Estado alternativo: "Este formato no incluye diagnosticos de enfermeria"
- **Mock data**: 00004 Riesgo de infeccion, 00046 Deterioro integridad cutanea, 00132 Dolor agudo

### 3. Ordenes Medicas (7 tipos con tabs)
- Radio Externa/Interna + Barra de busqueda con 3 modos
- Tabs por tipo de orden con contadores
- Cada tipo tiene panel de detalle (formulario) + tabla de ordenes agregadas
- **Formulacion**: Medicamento, cantidad, unidad, dosis, via, frecuencia, duracion, indicaciones
- **Laboratorio**: Examen CUPS, observacion
- **Radiologia**: Examen CUPS, lateralidad, indicaciones
- **Procedimientos**: Procedimiento CUPS, cantidad, observacion
- **PQX**: Duracion, anestesia, tipo, lateralidad, materiales
- **Interconsulta**: Especialidad, prioridad, justificacion
- **Incapacidad**: Fechas, dias (calculado), CIE-10, tipo (inicial/prorroga)
- **Mock data**: Metformina 850mg, Losartan 50mg, Atorvastatina 20mg, CUPS 903841 Hemoglobina glicosilada, 903818 Perfil lipidico, 871121 Rx torax

### 4. Odontograma
- Grid de 32 dientes (numeracion FDI: 18-11, 21-28, 48-41, 31-38)
- Toolbar lateral: Sano, Caries, Ausente, Restaurado, Corona, Fractura, etc.
- Dientes con 4 cuadrantes clickeables
- Leyenda de colores
- Botones Deshacer y Guardar

### 5. Carga de Archivo
- Dropzone con drag & drop + click para seleccionar
- Tipos: PDF, JPG, PNG, DICOM (badges)
- Tabla de archivos: thumbnail, nombre, descripcion, tamano, fecha, acciones (ver/eliminar)
- Empty state: "No hay archivos adjuntos"

### 6. Incapacidad
- Layout 2 columnas: formulario (izq) + historial (der)
- Formulario: Desde, Hasta, Dias adicionales, Display grande de dias calculados, CIE-10, Tipo, Descripcion
- Tabla historial con incapacidades previas
- Banner de exito al guardar

### 7. Info Paciente (Tab nivel 1)
- Patron Label/Value (Untitled UI)
- 4 secciones con iconos: Datos Basicos, Contacto, Ubicacion, Seguridad Social
- CountryAwareFields: labels cambian por pais (COL: Departamento, CHL: Region, MEX: Estado)
- Seccion metadata adicional
- Boton "Alertas de riesgo"

### 8. Historia Clinica (Tab nivel 1)
- Sub-tabs: HC previas + Ayudas Diagnosticas
- Filtros: fecha desde/hasta, formato, profesional
- Lista accordion expandible: fecha, formato, profesional, diagnosticos, acciones
- Paginacion server-side
- Links: Ver detalle, Consentimiento, PDF

### 9. Consentimiento Informado (Tab nivel 1)
- Lista de consentimientos con estado (Firmado/Pendiente)
- Links por cada uno: "Con firma" / "Solo PDF" / "Firmar"
- Panel de firma digital: canvas para firma manuscrita
- Radio "Quien firma": Paciente / Responsable / Acompanante
- Timestamp de firma

### 10. Finalizar Atencion (Dialog modal)
- **Pre-validacion**: Lista de campos obligatorios con iconos check/error + links "Ir al campo"
- **Progreso**: Progress bar 5 pasos (Guardando formato, Procesando diagnosticos, Generando ordenes, Actualizando evento, Completado)
- **Error**: Paso fallido con boton "Reintentar" individual, mensaje que pasos previos no se perdieron

### 11. Post-finalizacion
- Header verde con check animado: "Atencion Finalizada!"
- Grid resumen: paciente, documento, evento, tiempo, formato, profesional, convenio, fecha
- Tags de diagnosticos
- Panel impresion 2 columnas: HC PDF + Ordenes con checkboxes
- Boton "Firmar e Imprimir HC" + "Imprimir ordenes seleccionadas"
- Loading state en boton
- Footer: "Volver a Atencion de Pacientes" + "Nueva Atencion"

### 12. Modales Showcase
- Copiar desde otra atencion (seleccion granular por seccion)
- Busqueda CIE-10 avanzada
- Busqueda CUPS avanzada
- Busqueda medicamento
- Confirmar cancelacion
- Confirmar eliminacion de orden
- Alertas de riesgo del paciente

## Datos Mock (Colombia)

**Paciente**: Maria Alejandra Rodriguez Gomez, CC 1.023.456.789, 42 anos, Femenino, Bogota
**Convenio**: Sura EPS, Contributivo
**Profesional**: Dr. Carlos Mendez
**CIE-10**: E11.9, I10, J06.9, E78.0, M54.5, J18.9, K80.2
**CUPS**: 903841, 903818, 871121, 890201, 902210, 902016
**Medicamentos**: Metformina 850mg, Losartan 50mg, Atorvastatina 20mg
**NANDA**: 00004, 00046, 00132

## Principios de Diseno

1. **Keyboard-first**: Tab entre campos, Enter confirma, Escape cancela
2. **Auto-save**: Indicador "Guardado" visible, nunca perder datos
3. **Progressive disclosure**: Secciones colapsables, tabs por tipo
4. **Premium**: Animaciones spring, hover effects sutiles, skeleton loading
5. **Accesibilidad**: WCAG 2.1 AA, labels visibles, targets 44x44px
6. **Confianza total**: Progress bars, estados claros, retry en errores
