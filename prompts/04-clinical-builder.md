# Prompt: FormatBuilder Admin — Historia Clinica

## Contexto
MedicalAdmin es un sistema de gestion clinica. Esta vista es el **editor de formatos de Historia Clinica** (admin) — donde el Admin Clinico configura que preguntas, areas y tipos de input vera el medico cuando llene una HC.

## Stack Tecnico
- React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
- react-grid-layout para el grid de preguntas (isDraggable=true, isResizable=true en modo admin)
- Lucide icons (stroke 0.8px)
- Font: Inter 13px/18px/-0.31px (body), Satoshi 600-700 (headings)
- Palette: TailwindCSS Neutral (#262626 headings, #525252 body, #737373 muted)
- Backgrounds: 3 capas (#FFFFFF surface, #FCFCFC panel, #F0F0F0 muted)

## Vistas a Construir

### 1. format-list — Lista de formatos (pantalla inicial admin)
**Layout**: App shell con sidebar nav + tabla paginada
**Contenido**:
- Page header: titulo "Administracion de Formatos" + boton "+ Nuevo Formato"
- Filtros: busqueda por nombre, filtro por capacidad (Diagnostico, Lab, Rad, etc.), filtro por estado
- Tabla columnas: Nombre, Areas count, Preguntas count, Capacidades (badges color-coded: DX azul, LAB verde, RAD rosa, FAR amarillo, INT indigo, PQX violeta, INC rojo, ADJ esmeralda, ODO celeste), Estado (badge verde Activo / neutral Inactivo), Fecha modificacion, Acciones (editar, duplicar, toggle estado, eliminar)
- Server-side pagination
- Empty state: "No hay formatos configurados. Crea el primero."
- **Datos reales**: HISTORIA CLINICA CONSULTA EXTERNA (7 areas, 42 preguntas, DX+FAR+LAB+RAD+INT+INC), EVOLUCION, HC ODONTOLOGICA, FORMATO CERTIFICADO APTITUD LABORAL

### 2. format-builder — Editor 3 paneles (vista principal)
**Layout**: 3 paneles tipo DrChrono/SurveyJS
- **Panel izquierdo (~220px) — Areas Sidebar**:
  - Lista de areas con drag handles (grip-vertical icon)
  - Cada area: nombre (truncado), badge count preguntas, boton eliminar on hover
  - Area activa highlighted (blue-50 bg + blue border)
  - Boton "+ Nueva Area" con borde dashed al final
  - Drag & drop para reordenar
  - Areas ejemplo: MOTIVO CONSULTA, ENFERMEDAD ACTUAL, ANTECEDENTES PERS., ANTECEDENTES FAM., EXAMEN FISICO, PLAN, RECOMENDACIONES

- **Panel superior — Toolbar Tipos Pregunta**:
  - Botones draggable/clickable para cada tipo:
    - [Input] icon:type — Texto corto
    - [Textarea] icon:align-left — Texto largo
    - [Radio] icon:circle-dot — Seleccion unica
    - [Select] icon:chevrons-up-down — Dropdown
    - [Checkbox] icon:check-square — Seleccion multiple
    - [Fecha] icon:calendar-days — DatePicker
    - [Label] icon:tag — Solo lectura
    - [Popup] icon:external-link — Sub-formulario modal
  - Separador visual entre tipos basicos y especiales
  - Cada boton con borde sutil, hover blue

- **Panel central (flex) — Grid Editable**:
  - Grid 4 columnas con preguntas como cards
  - Cada card: drag handle + nombre + required dot (rojo) + type badge + width indicator
  - Cards con span-2, span-3, span-4 para anchos variables
  - Group dividers dentro del area (linea + label uppercase)
  - Click en card = abre properties sheet
  - Hover: border blue, shadow sutil
  - Selected: border blue solido + ring

- **Topbar**: Back button + nombre formato + stats (7 areas / 42 preguntas) + save indicator (dot verde "Guardado") + toggle Editor/Preview + boton "Gestionar Areas" + boton "Guardar"
- Sidebar nav colapsado a 56px (solo iconos) para maximizar espacio del builder

### 3. format-preview — Modo Preview
- Misma estructura pero renderiza como DynamicFormRenderer del medico
- Banner superior amber: "Vista previa — asi vera este formato el profesional de salud"
- Areas sidebar con progress indicators (0/N)
- Formulario con inputs reales disabled: text inputs, textareas, radio groups, selects
- isDraggable=false, isResizable=false
- Toggle Editor/Preview en topbar

### 4. format-areas-crud — CRUD de Areas
- Tabla reordenable: drag handle, Orden, Nombre, Grupos, Preguntas, Estado, Acciones
- Warning banner amber: instrucciones de drag-to-reorder
- Modal crear/editar area: Nombre, Descripcion, Orden (select), toggle Activo
- Boton "+ Nueva Area"

### 5. question-properties — Sheet lateral propiedades
- Sheet 380px derecha con shadow, grid/areas panels dimmed detras
- Secciones:
  - Info Basica: nombre (input), tipo (select 8 tipos), toggle obligatoria
  - Layout: ancho en grid (select: 1/4, 1/3, 1/2, 2/3, 3/4, full)
  - Contenido: valor default, placeholder, tooltip de ayuda
  - Opciones respuesta (radio/select/checkbox): lista editable con drag handles, + agregar opcion
  - Logica condicional: "Mostrar SI [campo] [operador] [valor]" con selects inline
- Footer: boton Eliminar (rojo) a la izquierda, Cancelar + Guardar a la derecha

## Design Spec
```css
font-family: 'Inter', system-ui, sans-serif;
font-size: 13px; line-height: 18px; letter-spacing: -0.31px;
headings: 'Satoshi', font-weight: 600-700;
--bg-surface: #FFFFFF; --bg-panel: #FCFCFC; --bg-muted: #F0F0F0;
--text-heading: #262626; --text-body: #525252; --text-muted: #737373;
--border: #E5E5E5; border-radius: 8px / 12px;
buttons: bg #171717, hover #333, text white;
badges status: bg-color-50 + text-color-700 pattern;
icons: Lucide, stroke 0.8px;
cards: 1px border neutral-200, hover shadow-xs, selected ring blue;
```

## Benchmark Visual
- **Cal.com**: nivel visual general premium SaaS
- **DrChrono**: 3 paneles form builder (list, preview, tools)
- **SurveyJS**: conditional logic GUI, WYSIWYG builder
- **@_heyrico cheatsheet**: 13px/18px/-0.31px, neutral palette, 3-layer backgrounds
- **@barlydesign Synchro**: modals con tabs, tables premium

## Datos Mock
Nombres reales de la DB medical_admin:
- Formatos: HISTORIA CLINICA CONSULTA EXTERNA, HISTORIA CLINICA ODONTOLOGICA, EVOLUCION, FORMATO CERTIFICADO DE APTITUD LABORAL
- Areas: MOTIVO DE CONSULTA, ENFERMEDAD ACTUAL, ANTECEDENTES PERSONALES, ANTECEDENTES FAMILIARES, EXAMEN FISICO, PLAN, RECOMENDACIONES, FORMULACION Y ORDENES
- Preguntas: Frecuencia Cardiaca, Frecuencia Respiratoria, Presion Arterial, Temperatura, Ojos, Oidos, Garganta, Torax, Abdomen, Sistema Nervioso
- 8 tipos pregunta: Input, Textarea, Radio, Select, Checkbox, DatePicker, Label, Popup

## Reglas
- El FormatBuilder es la segunda experiencia mas importante (despues del llenado HC)
- Debe verse como form builder moderno (SurveyJS, Formbox, DrChrono) — NO como software medico arcaico
- Drag & drop visual con grab cursors y drag handles
- Grid layout con preguntas como cards editables
- Responsive, todos los estados (empty, loading, error, populated)
- WCAG 2.1 AA: contraste 4.5:1, targets 44x44px, keyboard navigation, focus visible
