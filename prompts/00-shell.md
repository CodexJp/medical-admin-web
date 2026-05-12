# Google Stitch Prompt — Shell, Dashboard & Command Palette

## Descripción General

Construir el shell principal de MedicalAdmin, un sistema de gestión clínica moderno tipo SaaS premium (nivel Cal.com / Synchro by @barlydesign). Incluye: login, sidebar de navegación, header con búsqueda, 3 dashboards por rol, y command palette.

---

## Design Spec (APLICAR A TODO)

```
Font body: Inter, 13px, line-height 18px, letter-spacing -0.31px, weight 400
Font headings: Satoshi, weight 600-700
Colors text: heading #262626, body #525252, muted #737373
Backgrounds: surface #FFFFFF, panel #FCFCFC, muted #F0F0F0
Borders: #E5E5E5, radius 8px cards, 12px modales
Shadows: none o 0 1px 2px rgb(0 0 0 / 0.03)
Status badges: bg-{color}-50 + text-{color}-700
Iconos: Lucide, stroke-width 1.5
```

---

## Pantalla 1: Login (`login.html`)

Layout split horizontal 50/50:
- **Panel izquierdo** (fondo oscuro #171717 con gradientes sutiles violet/blue):
  - Logo MedicalAdmin: icono heart-pulse en cuadrado gradient violet→blue + texto "MedicalAdmin" en Satoshi 24px bold blanco
  - Tagline: "Gestión clínica moderna. Rápida. Confiable. Premium." en 16px blanco 60% opacity
  - 3 features con iconos en cuadrados translúcidos: velocidad de carga, auto-guardado, WhatsApp
- **Panel derecho** (fondo blanco):
  - Logo del tenant (placeholder building icon + nombre "Clínica San Rafael")
  - Título "Bienvenido" en Satoshi 24px bold
  - Subtítulo "Ingresa tus credenciales para acceder al sistema"
  - Campo email con label visible
  - Campo password con label visible
  - Row: checkbox "Recordarme" + link "¿Olvidaste tu contraseña?"
  - Botón "Iniciar Sesión" full-width, fondo #171717, 44px height con icono log-in
  - Divider "o continuar con"
  - Botón SSO outline con icono key
  - Footer: versión + links términos/privacidad/soporte

Responsive: En tablet/mobile, stack vertical (branding arriba compacto, form abajo).

---

## Pantalla 2: Shell Layout (`shell.html`)

Layout flex horizontal completo:
- **AppSidebar** (256px expandido, 64px colapsado):
  - Header: logo MedicalAdmin + botón toggle panel-left-close
  - Navegación por secciones con labels uppercase 11px:
    - Sin label: Inicio (layout-dashboard) — ACTIVO
    - "Atención": Agenda (calendar-days, badge "3"), Atención Pacientes (user-check), Historia Clínica (file-heart, badge "2")
    - "Servicios": Farmacia (pill), Facturación (receipt)
    - "Administración": Admin (settings-2) — expandible con sub-items: Config. Médica, Servicios, Procedimientos, Convenios, Tarifas, Usuarios, Perfiles, Sedes
    - Configuración (sliders-horizontal)
  - Items: icono 18px + label 13px + badge rojo. Active: bg #F5F5F5 + border-left 2px negro
  - Colapsado: solo iconos centrados + tooltip negro al hover
  - Footer:
    - Sección "Accesibilidad": 3 botones A / A+ / A++ para font-size, botón contraste
    - Info usuario: avatar circular gradient + nombre "Dr. Juan P. Rodríguez" + rol "Medicina General"
  - Animación collapse: transition width 300ms ease-in-out
- **Header** (56px sticky):
  - Logo tenant (icono building + "Clínica San Rafael")
  - Separador vertical
  - Search bar: icono search + input "Buscar pacientes, CIE-10, CUPS..." + kbd "⌘K" — readonly, click abre command palette
  - Spacer
  - Botón bell con badge rojo "5"
  - Botón help
  - User button: avatar + nombre + chevron-down — dropdown con: Mi Perfil, Preferencias, separador, Cerrar Sesión (rojo)
- **Content area**: fondo #F0F0F0, padding 24px

---

## Pantalla 3: Dashboard Médico (`dashboard-medico.html`)

Shell completo + contenido:
- **Greeting**: "Buenos días, Dr. Rodríguez" en Satoshi 24px bold + "Viernes 4 de abril, 2026 — Sede Centro, Consultorio 3"
- **4 KPI Cards** (grid 4 columnas):
  1. "Pacientes hoy": 24, icono users azul, trend "+3 vs. viernes anterior" verde
  2. "Atendidos": 8, icono check-circle verde, "de 24 programados"
  3. "HC sin finalizar": 2, icono alert-circle amber, "Requiere acción" rojo
  4. "Próximo paciente en": 15 min, icono clock violet, "María Fernanda Gómez — 10:30"
  - Cards: borde 1px #E5E5E5, radius 8px, hover shadow sutil + translateY(-1px)
- **3 Quick Actions** (grid 3 columnas): Nueva Atención (blue), Buscar Paciente (green), Ver Agenda (violet)
  - Cada uno: icono en cuadrado coloreado 40px + label 12px. Hover: border más oscuro + shadow + translateY(-1px)
- **Grid 2 columnas** (contenido + alertas):
  - Izquierda — Card "Próximas citas hoy": lista 6 citas con hora monospace + indicador color vertical 4px + nombre paciente + detalle convenio + badge estado (Confirmada verde, En espera amber, Pendiente gris)
  - Derecha — Card "Alertas": 3 items con iconos warning/info + texto + timestamp. Card "Progreso del día": barra progreso 33% gradient violet→blue + stats 8/14/2

---

## Pantalla 4: Dashboard Recepcionista (`dashboard-recepcionista.html`)

Misma estructura shell. Diferencias:
- Greeting: "Buenos días, Ana María" — Recepcionista, avatar gradient naranja
- **4 KPIs**: Citas hoy (45), Confirmadas (32, 71%), En espera (8), Sin confirmar (5, WhatsApp)
- **3 Quick Actions**: Nueva Cita, Recepción, Calendario
- **Grid**: Izquierda — "Cola de espera" con número, nombre, doctor+consultorio, hora llegada + tiempo de espera (coloreado: verde <20min, amber 20-30, rojo >30). Derecha — "Confirmación WhatsApp" con badge estado (Confirmada verde, Pendiente gris, Sin respuesta rojo)

---

## Pantalla 5: Dashboard Admin (`dashboard-admin.html`)

Misma estructura shell. Diferencias:
- Greeting: "Buenos días, Carlos" — Administrador, avatar gradient verde
- Sidebar con sección "Administración" expandida: Usuarios, Perfiles, Sedes, Config. Médica, Convenios
- **4 KPIs**: Usuarios activos (28/45), Citas del día (127), Facturación ($4.2M COP), HC finalizadas (42/56)
- **4 Quick Links** horizontales: Gestión Usuarios, Convenios, Config. Médica, Configuración
- **Grid 2 columnas**: "Atenciones por sede" (4 sedes con barras horizontales coloreadas) + "Ocupación consultorios" (4 especialidades con barras y porcentajes)

---

## Pantalla 6: Command Palette (`command-palette.html`)

Overlay fullscreen con backdrop blur:
- **Dialog centrado** (max-width 640px, radius 12px, shadow fuerte):
  - Input búsqueda: icono search + input 15px "Buscar pacientes, CIE-10, CUPS, medicamentos..." + botón "Esc"
  - Resultados agrupados por categoría (label uppercase 11px):
    - **Pacientes** (icono user, fondo azul): 3 pacientes con nombre + CC + convenio + badge "10:30 hoy"
    - **CIE-10** (icono stethoscope, fondo verde): E11 Diabetes, I10 Hipertensión, J06 Infección resp.
    - **CUPS** (icono clipboard-list, fondo violet): 890201, 890301
    - **Medicamentos** (icono pill, fondo amber): Acetaminofén 500mg, Losartán 50mg
    - **Menú** (icono gris): Agenda, Historia Clínica, Configuración
  - Items: icono 32px en cuadrado coloreado + título 13px bold + subtítulo 12px muted. Hover/selected: bg #F0F0F0
  - Footer: hints de teclado (↑↓ Navegar, Enter Seleccionar, Esc Cerrar, Tab Categoría)
  - Empty state si no hay resultados: icono search-x + "Sin resultados"
  - Filtrado en tiempo real por contenido de data-search

Animación entrada: slideDown 200ms + opacity fade.

---

## Datos Mock (nombres colombianos realistas)

- Dr. Juan Pablo Rodríguez Álvarez — Medicina General — Cons. 3
- Dra. María Salazar — Especialista
- Dr. Montoya — Especialista
- Ana María López — Recepcionista
- Carlos Ramírez — Administrador
- Pacientes: María Fernanda Gómez López (CC 1.098.765.432, AXA Colpatria), Carlos Alberto Melo Jiménez (CC 80.234.567, Sura EPS), Laura Patricia Suárez Díaz (CC 52.789.012, Particular), Andrés Felipe Torres Ruiz (Nueva EPS), Sandra Milena Vargas Parra (Compensar), Ricardo José Peña Castillo (Sanitas), Pedro Antonio Rojas Martínez, Carmen Elisa Vega Arias, Fernando José Castaño Gil, Gloria Inés Mendoza Duarte
- Tenant: Clínica San Rafael
- Sedes: Centro, Norte, Sur, Oriente
