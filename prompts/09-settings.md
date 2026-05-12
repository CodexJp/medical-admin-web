# Google Stitch Prompt — Settings

## Descripción General

Pantalla de Configuración (Settings) de MedicalAdmin. Layout con navegación lateral tipo sidebar + panel de contenido. Nivel visual SaaS premium (Cal.com, Synchro).

---

## Design Spec (APLICAR A TODO)

```
Font body: Inter, 13px, line-height 18px, letter-spacing -0.31px, weight 400
Font headings: Satoshi, weight 600-700
Colors text: heading #262626, body #525252, muted #737373
Backgrounds: surface #FFFFFF, panel #FCFCFC, muted #F0F0F0
Borders: #E5E5E5, radius 8px cards, 12px modales
Shadows: none o 0 1px 2px rgb(0 0 0 / 0.03)
Iconos: Lucide, stroke-width 1.5
Inputs: height 36px, padding 0 12px, border 1px #E5E5E5, radius 6px, focus: border #A3A3A3 + ring 2px
```

---

## Layout General

Shell completo de MedicalAdmin (sidebar + header) con contenido dividido en:

- **Settings sidebar nav** (220px, fondo blanco, borde derecho):
  - Título "Configuración" en Satoshi 16px 600
  - 5 items de navegación, cada uno con icono 16px + label 13px:
    1. Perfil (user) — ACTIVO por default
    2. Notificaciones (bell)
    3. Cuenta (globe)
    4. Seguridad (shield)
    5. Accesibilidad (accessibility)
  - Item activo: fondo #F5F5F5, font-weight 500

- **Settings content** (flex-1, padding 32px 40px, fondo #F0F0F0, max-width 640px):
  - Cada sección tiene: título Satoshi 20px bold + descripción muted + cards blancas con contenido

---

## Sección 1: Perfil

- **Card principal** con:
  - Avatar section: círculo 64px gradient violet→blue con iniciales "JP" + botón "Subir foto" (negro) + botón "Eliminar" (outline)
  - Grid 2 columnas: Nombre "Juan Pablo" + Apellidos "Rodríguez Álvarez"
  - Email (disabled, fondo gris): "jrodriguez@clinicasanrafael.com" + hint "El correo es gestionado por el administrador"
  - Grid 2 columnas: Especialidad (disabled) "Medicina General" + Registro médico (disabled) "RM-12345"

---

## Sección 2: Notificaciones

- **Card "Notificaciones en la app"**: 4 toggle rows:
  1. "Citas nuevas" — ON
  2. "Cancelaciones" — ON
  3. "HC sin finalizar" — ON
  4. "Confirmación WhatsApp" — OFF
  
  Cada row: label 13px bold + descripción 12px muted + toggle switch (40x22px). Toggle ON: fondo #171717, knob derecha. Toggle OFF: fondo #F0F0F0, knob izquierda.

- **Card "Notificaciones por correo"**: 2 toggle rows:
  1. "Resumen diario" — OFF
  2. "Alertas del sistema" — ON

---

## Sección 3: Cuenta

- **Card única** con 2 rows de 2 columnas:
  - Row 1: Idioma select (Español/English/Português) + Zona horaria select (5 opciones)
  - Row 2: Formato fecha select (DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD) + Formato hora select (24h, 12h)
  
  Selects: appearance none, custom chevron SVG, misma altura que inputs.

---

## Sección 4: Seguridad

- **Card "Cambiar contraseña"**: 3 campos password + botón "Actualizar contraseña"
- **Card "2FA"**: toggle row "Habilitar 2FA"
- **Card "Sesiones activas"**: 2 items — "Chrome MacOS" (badge "Activa" verde) + "Safari iPad" (botón "Cerrar" rojo outline)

---

## Sección 5: Accesibilidad

- **Card "Tamaño de fuente"**: 3 opciones como cards seleccionables (border 2px):
  - Normal (13px) — SELECCIONADO (borde negro)
  - Grande (16px)
  - Extra Grande (18px)
  - Cada opción: muestra "Aa" en el tamaño real + label abajo
  - Al seleccionar: cambia CSS variable --font-size-base en el document

- **Card "Esquema de colores"**: 3 opciones como cards:
  - Default — SELECCIONADO: preview gradient blanco/panel
  - Alto Contraste: preview gradient blanco/negro
  - Reducir Movimiento: preview gradient gris claro/medio
  - Al seleccionar: aplica clase en `<html>`

- **Card "Densidad"**: 2 opciones:
  - Cómoda — SELECCIONADO: preview con barras espaciadas (gap 3px)
  - Compacta: preview con barras juntas (gap 1px, barras más finas)

---

## Interacciones

- Click en nav item: muestra la sección correspondiente, oculta las demás
- Toggles: click alterna clase .on
- Font size selection: cambia variable CSS en tiempo real
- Esquema colores: aplica clase al HTML
- URL hash (#accessibility, #security) navega directo a la sección

---

## Datos Mock

- Usuario: Dr. Juan Pablo Rodríguez Álvarez
- Email: jrodriguez@clinicasanrafael.com
- Especialidad: Medicina General
- Registro: RM-12345
- Tenant: Clínica San Rafael
