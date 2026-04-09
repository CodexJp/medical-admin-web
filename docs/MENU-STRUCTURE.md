# Estructura de Menu Unificada -- MedicalAdmin React

> Documento de referencia para el rediseno del sidebar de la nueva SPA React (`medicaladmin-web`).
> Fuente: codigo fuente JSF + Angular + BD (`med_appmodulo`, `med_appmenu`, `gui_ma_menu`, `gui_ma_menu_item`).

---

## 1. Mecanismo de Carga de Menus (ambas apps)

### JSF (MedicalAdminWEB)
- **Tabs de modulos**: Se cargan desde BD tabla `med_appmodulo` via `ModuleUtil.modules` (clase estatica).
- **Items del menu horizontal**: Se cargan desde BD tabla `med_appmenu` via `AuthenticationService.findMenuItems(accountId, secUserId)`, filtrado por roles del usuario.
- **Sidebar vertical intra-modulo**: Se cargan desde BD tablas `gui_ma_menu` + `gui_ma_menu_item` (16 menus, estructura arbol con `id_parent` y `level`).
- **Modulos opcionales**: Urgencias, PYP, Laboratorio, Radiologia, PQX, Banco Sangre, CRM se muestran solo si la cuenta (`MedAccount`) tiene el flag correspondiente (`hasUrg`, `hasPyp`, `hasLab`, etc.).
- **Tabs fijos (derecha)**: "Usuarios" (id=-1) y "Perfiles" (id=-2), visibles segun permisos `allowUserAdmin` / `allowProfileAdmin`.

### Angular (medicaladminfronts3)
- **Modulos sidebar**: Cargados via API REST `POST /loadAppModule` --> tabla `med_appmodulo`.
- **Sub-modulos**: Cargados via API REST `POST /loadSubModule` --> tabla `med_appmenu` donde `id_father IS NULL` (agrupadores).
- **Items/apps**: Cargados via API REST `POST /loadAppMenu` --> tabla `med_appmenu` donde `id_father IS NOT NULL`, filtrado por roles.
- **Renderizado**: 3 niveles en sidebar: Modulo > Sub-modulo > App. Apps con `path_angular = 'inContruction'` se ocultan.
- **Control de Accesos**: Hardcodeado aparte en el sidebar HTML (no viene de BD como modulo, sino de flags `applyAdminUser` / `applyAdminProfile`).
- **Items con `url_external`**: Se abren en nueva pestana con token de autenticacion inyectado.
- **Internacionalizacion**: Labels via `$translate` con claves `global.menu.m{id}`, `global.subModulo.sm{id}`, `global.app.a{id}`.

---

## 2. Menu JSF -- Estructura Completa (desde BD)

### Tabs Principales (med_appmodulo)
```
[Home] (id=0, siempre visible)
[1] Consulta Externa       zmdi-search-in-page
[2] Historia Clinica        zmdi-assignment-o
[3] Facturacion             zmdi-money
[4] Farmacia                zmdi-hospital-alt
[5] Hospitalizacion         zmdi-hospital          (si account.hasUrg)
[6] Reportes                zmdi-file-text
[7] PyP                     zmdi-favorite           (si account.hasPyp)
[8] Laboratorio             zmdi-eyedropper         (si account.hasLab)
[9] Radiologia              zmdi-account-box-o      (si account.hasRad)
[10] Quirurgicos            zmdi-plaster            (si account.hasProcedure)
[11] Banco Sangre           zmdi-drink              (si account.hasBloodBank)
[12] CRM                    zmdi-file               (si account.hasCRM)
--- derecha ---
[-2] Perfiles               (si allowProfileAdmin)
[-1] Usuarios               (si allowUserAdmin)
```

### Menu Horizontal (med_appmenu, dentro de cada modulo)
El menu horizontal muestra sub-menus (padres) y sus items (hijos) como `MenuItem` de ICEfaces.

### Sidebar Vertical (gui_ma_menu + gui_ma_menu_item)
Son 16 menus especificos para pantallas de detalle dentro de JSF:
- Modulo de Enfermeria (id=1)
- Administracion de Convenio (id=2)
- Administracion de Rips (id=3)
- Administracion de Factura (id=4)
- Config Plantillas Ordenes Medicas (id=5)
- Administracion Existencia Inventario (id=6)
- Administracion de Perfiles (id=7)
- Administracion Convenio Proveedor (id=8)
- Administracion de Usuarios (id=9)
- Administracion de Bodega (id=10)
- Administracion de Articulo (id=11)
- Administracion de Movimiento (id=12)
- Administracion Tipo de Articulo (id=13)
- Administracion Tipo de Movimiento (id=14)
- Entrega de Articulo (id=15)
- Administracion Orden de Facturacion (id=16)

> Nota: Estos menus internos son navegacion DENTRO de una pantalla (wizard/accordion). En React se reemplazan por tabs, steppers o breadcrumbs dentro de cada vista.

---

## 3. Menu Angular -- Estructura Completa (desde BD + codigo)

### Sidebar (3 niveles: Modulo > SubModulo > App)

```
Home (#/ladinPage)

Control de Accesos  [hardcodeado, NO de BD]
  > Configuracion
    - Administracion de Usuarios     (ui-sref: adminUsers)
    - Administracion de Perfiles     (ui-sref: adminProfiles)

Consulta Externa (id=1)
  > Configuracion General (id=1)
    - Adm. Horarios Consulta Externa (id=4)     [inContruction]
    - Adm. de Consultorios (id=61)               [inContruction]
    - Adm. Duracion de Citas (id=64)             [inContruction]
  > Agendamiento (id=2)
    - Adm. de Otros Eventos (id=3)               [inContruction]
    - Creacion de Citas Medicas (id=8)           scheduleAppoinment
    - Creacion de Otros Eventos (id=9)           createOtherEvents
    - Recepcion de Paciente (id=13)              citReceptionPatient
    - Adm. de Citas Medicas (id=18)              [inContruction]
    - Adm. motivos de cancelacion (id=184)       citReasonDelete

Historia Clinica (id=2)
  > Configuracion General (id=21)
    - Config. Formatos HC (id=22)                [inContruction]
    - Adm. Profesionales de Salud (id=53)        adminProfSld
    - Adm. Medicamentos e Insumos (id=74)        [inContruction]
    - Adm. Protocolos Medicos (id=100)           [inContruction]
    - Adm. Indicadores Pacientes (id=107)        [inContruction]
    - Config. Areas Funcionales (id=111)         [inContruction]
    - Config. de Servicio (id=123)               [inContruction]
    - Config. Otros Procedimientos (id=124)      [inContruction]
    - Config. Plantillas Ordenes Medicas (id=145)[inContruction]
    - Adm. Lista de Chequeo (id=154)             [inContruction]
    - Adm. Reportes Indicadores (id=155)         [inContruction]
    - Adm. de Metadatos (id=157)                 [inContruction]
    - Adm. de Especialidades (id=177)            hisEspeciality
    - Adm. Tipo de Cita (id=178)                 adminCitType
    - Adm. Formulas para Consultorios (id=179)   adminHisFormulationOrder
  > Configuracion Hospitalizacion (id=26)
    - Adm. de Camas (id=93)                      [inContruction]
    - Adm. de Piso (id=119)                      [inContruction]
    - Adm. de Pabellon (id=120)                  [inContruction]
    - Adm. de Habitacion (id=121)                [inContruction]
    - Adm. de Ocupaciones (id=146)               [inContruction]
  > Historia Clinica (id=42)
    - Adm. de Pacientes (id=20)                  adminHisPatient
    - Atencion de Pacientes (id=23)              attentionPatient
    - Historia Clinica Externa (id=27)           hisHistoryExternal
    - Evaluacion por Enfermeria (id=182)         nursingEvaluation
  > Consulta Externa (id=150)
    [sin hijos activos en BD]
  > Hospitalizacion (id=151)
    - Evaluacion Triage (id=60)                  [inContruction]
    - Atencion Pac. Hospitalizados (id=63)       [inContruction]
    - Tablero Control Enfermeria (id=94)         [inContruction]

Facturacion (id=3)
  > Ejecucion de Procesos (id=15)
    - Adm. Orden de Facturacion (id=14)          adminOrders
    - Adm. de Facturas (id=16)                   billAdministration
    - Adm. de Clientes (id=30)                   [inContruction]
    - Adm. de Rips (id=31)                       adminRips
    - Estado cuenta pac. hospitalizados (id=99)  [inContruction]
    - Enrutamiento de Ordenes (id=156)           [inContruction]
    - Adm. eliminacion de factura (id=167)       [inContruction]
    - Adm. Lista de Pacientes (id=171)           admPatientList
  > Configuracion General (id=24)
    - Adm. Medios de Pago (id=12)                [inContruction]
    - Adm. Rangos de Facturacion (id=17)         [inContruction]
    - Adm. Manuales Tarifarios (id=28)           [inContruction]
    - Adm. Tarifas de Facturacion (id=32)        [inContruction]
    - Adm. Lista Precios Med. e Insumos (id=33)  [inContruction]
    - Adm. Tarifas de Medicamentos (id=34)       [inContruction]
    - Adm. de Convenio (id=35)                   [inContruction]
    - Adm. Centros de Atencion (id=54)           [inContruction]
    - Adm. Paquetes de Facturacion (id=126)      [inContruction]
    - Adm. de Sedes (id=148)                     adminSeat
    - Adm. Tarifas Fact. Proveedoras (id=152)    [inContruction]
    - Adm. Convenio Proveedor (id=153)           [inContruction]

Farmacia (id=4)
  > Configuracion (id=37)
    - Adm. de Bodegas (id=38)                    adminWarehouse
    - Adm. Tipo de Articulos (id=39)             adminItemType
    - Adm. Tipo de Movimientos (id=40)           adminTransactionType
    - Adm. de Metadatos (id=183)                 adminMetadata
  > Ejecucion de Procesos (id=149)
    - Adm. de Articulos (id=41)                  admin_article
    - Creacion Movimientos Inventario (id=70)    inventoryMovements
    - Entrega de Articulos (id=71)               dispatchIndex
    - Adm. Existencia en Inventario (id=147)     [inContruction]
  > Reporte (id=180)
    - Kardex (id=181)                             kardex

Hospitalizacion (id=5)
  > Ejecucion de Procesos (id=51)
    - Estancia y Traslado (id=95)                [inContruction]
  > Admisiones (id=59)
    - Admision de Pacientes (id=62)              hosAdminPatient
    - Adm. Admisiones de Pacientes (id=139)      [inContruction]
    - Adm. eliminacion admision pac. (id=166)    adminAdmissionPatientDelete
    - Atencion de Pacientes (id=176)             hosHistoryHospitalization

Reportes (id=6)
  > General (id=57)
    - Reportes Consulta Externa (id=58)          outpatientConsultationReports
    - Reportes Laboratorio (id=65)               laboratoryReports
    - Reportes Farmacia (id=66)                  pharmacyReports
    - Reportes Historia Clinica (id=67)          medicalHistoryReports
    - Reportes Hospitalizacion (id=68)           hospitalizationReports
    - Reportes Radiologia (id=69)                radiologyReports
    - Reportes Facturacion (id=75)               invoicingReports
    - Reportes CRM (id=144)                      [inContruction]
  > Historia Clinica (id=130)
    - Formato Excel (id=131)                     excelFormat
    - Plantilla JET (id=168)                     tamplateJet

PyP (id=7)
  > Administracion (id=72)
    - Administracion de Programas (id=73)        adminPyP

Laboratorio (id=8)
  > Configuracion (id=79)
    - Adm. de Cubiculos (id=80)                  [inContruction]
    - Config. de Examenes (id=83)                [inContruction]
    - Config. duraciones toma muestra (id=85)    [inContruction]
    - Adm. horarios toma muestra (id=86)         [inContruction]
    - Config. Paquetes Lab. (id=90)              [inContruction]
    - Config. protocolos examenes (id=91)        [inContruction]
    - Adm. Areas de Laboratorio (id=128)         [inContruction]
    - Config. Unidades Indicadores (id=129)      [inContruction]
    - Adm. Eventos de Laboratorio (id=132)       [inContruction]
  > Ejecucion de Procesos (id=81)
    - Recepcion de Pacientes (id=82)             labReceptionPatient
    - Agendamiento examenes solicitados (id=84)  [inContruction]
    - Toma de Muestra (id=88)                    admin_sample
    - Consignacion de Resultados (id=89)         [inContruction]
    - Consignacion Examenes Hoja Trabajo (id=127)[inContruction]

Radiologia (id=9)
  > Configuracion (id=96)
    - Adm. Estudios de Radiologia (id=97)        [inContruction]
    - Adm. de Duracion (id=133)                  adminduration
    - Adm. Horarios de Sala (id=137)             [inContruction]
    - Adm. de Sala (id=138)                      adminrooms
  > Agendamiento (id=134)
    - Adm. estudios solicitados (id=98)          [inContruction]
    - Recepcion de pacientes (id=135)            radReceptionPatient
    - Agendamiento Estudios solicitados (id=136) adminRequestRadExam

Quirurgicos (id=10)
  > Ejecucion de Procesos (id=101)
    - Solicitudes Proc. Quirurgicos (id=112)     [inContruction]
    - Medicamentos, Mat. Especiales (id=116)     [inContruction]
    - Autorizaciones proc. quirurgicos (id=117)  [inContruction]
    - Descripcion Quirurgica (id=122)            [inContruction]
  > Administracion (id=103)
    - Tipos de Anestesia (id=104)                [inContruction]
    - Adm. motivo de cambio (id=105)             [inContruction]
    - Adm. de procedimientos (id=106)            [inContruction]
    - Adm. Canastas de Cirugia (id=108)          [inContruction]
    - Adm. Salas de Cirugia (id=109)             [inContruction]
    - Adm. Horarios Salas Cirugia (id=110)       [inContruction]
    - Adm. Tipos de Heridas (id=125)             [inContruction]

Banco Sangre (id=11)
  > Administracion (id=113)
    - Adm. de Procedencia (id=114)               [inContruction]
    - Adm. de Hemoderivado (id=115)              [inContruction]
    - Recepcion de sangre (id=118)               [inContruction]

CRM (id=12)
  > Administracion (id=140)
    - Config. Plantilla CRM (id=142)             [inContruction]
  > Evaluacion (id=141)
    - Evaluacion Plantilla CRM (id=143)          [inContruction]

Integracion (id=13)
  > Configuracion (id=170)
    - Configuracion con TISSUE (id=169)          configTissue
    - Adm. Diccionario de Datos (id=185)         admindatalake

Control de Accesos (id=14) [en Angular es hardcodeado, pero existe en BD]
  > Configuracion (id=172)  [sin hijos activos]
  > Configuracion (id=173)  [sin hijos activos]
  > Administracion de Usuarios (id=174) [sin hijos]
  > Administracion de Perfiles (id=175) [sin hijos]

Tablero / Estadisticas (id=15)
  > Tablero (id=186)
    - Indicadores (id=187)  --> url_external: medicaladmin-web (React)
```

---

## 4. Menu React Propuesto (Unificacion)

### Principios de Diseno

1. **Respetar agrupacion logica del dominio**: La configuracion de cada modulo va DENTRO del modulo, no en un "Admin" generico.
2. **Solo 5 dominios tienen vistas React nativas** (PRD Phase 1): CIT, HIS, MED, POS, FAR.
3. **Los demas modulos aparecen en sidebar** pero redirigen a Angular (iframe o nueva pestana).
4. **Admin generico** solo para cosas transversales: Usuarios, Perfiles, Sedes, Cuenta.
5. **Modulos condicionales** respetan los flags de cuenta (`hasLab`, `hasRad`, etc.).
6. **Permisos**: El menu se filtra por los roles del usuario (misma logica que Angular: `med_role_med_applink`).

### Estructura Propuesta

```
SIDEBAR (collapsible, 3 niveles)
========================================

[Logo MedicalAdmin]
[Avatar + Nombre usuario]

-- INICIO --
  Home / Dashboard

-- MODULOS CORE (vistas React nativas) --

Consulta Externa                    icon: Calendar
  Agendamiento
    - Agenda de Citas               [React - nueva vista unificada]
    - Creacion de Citas Medicas     [React]
    - Creacion de Otros Eventos     [React]
    - Recepcion de Paciente         [React]
    - Motivos de Cancelacion        [React]
  Configuracion
    - Horarios Consulta Externa     [React]
    - Consultorios                  [React]
    - Duracion de Citas             [React]

Historia Clinica                    icon: ClipboardList
  Consulta Externa
    - Atencion de Pacientes         [React]
    - Historia Clinica Externa      [React]
    - Evaluacion por Enfermeria     [React]
  Historia Clinica
    - Administracion de Pacientes   [React]
  Hospitalizacion
    - Atencion Pac. Hospitalizados  [-> Angular]
    - Evaluacion Triage             [-> Angular]
    - Tablero Control Enfermeria    [-> Angular]
  Configuracion General
    - Formatos Historia Clinica     [-> JSF]
    - Profesionales de Salud        [React]
    - Especialidades                [React]
    - Tipo de Cita                  [React]
    - Formulas para Consultorios    [React]
    - Servicios                     [-> JSF]
    - Otros Procedimientos          [-> JSF]
    - Plantillas Ordenes Medicas    [-> JSF]
    - Medicamentos e Insumos        [-> JSF]
    - Protocolos Medicos            [-> JSF]
    - Areas Funcionales             [-> JSF]
    - Lista de Chequeo              [-> JSF]
    - Metadatos                     [-> JSF]
  Configuracion Hospitalizacion
    - Camas                         [-> JSF]
    - Pisos                         [-> JSF]
    - Pabellones                    [-> JSF]
    - Habitaciones                  [-> JSF]
    - Ocupaciones                   [-> JSF]

Facturacion                         icon: DollarSign
  Ejecucion de Procesos
    - Ordenes de Facturacion        [React]
    - Administracion de Facturas    [React]
    - Administracion de Rips        [React]
    - Lista de Pacientes            [React]
    - Clientes                      [-> JSF]
    - Estado Cuenta Hospitalizados  [-> JSF]
    - Enrutamiento de Ordenes       [-> JSF]
    - Eliminacion de Factura        [-> JSF]
  Configuracion
    - Convenios                     [-> JSF]
    - Tarifas de Facturacion        [-> JSF]
    - Tarifas de Medicamentos       [-> JSF]
    - Lista Precios Med. e Insumos  [-> JSF]
    - Manuales Tarifarios           [-> JSF]
    - Medios de Pago                [-> JSF]
    - Rangos de Facturacion         [-> JSF]
    - Centros de Atencion           [-> JSF]
    - Paquetes de Facturacion       [-> JSF]
    - Sedes                         [React]
    - Tarifas Fact. Proveedoras     [-> JSF]
    - Convenio Proveedor            [-> JSF]

Farmacia                            icon: Pill
  Ejecucion de Procesos
    - Articulos                     [React]
    - Movimientos Inventario        [React]
    - Entrega de Articulos          [React]
    - Existencia en Inventario      [-> JSF]
  Configuracion
    - Bodegas                       [React]
    - Tipo de Articulos             [React]
    - Tipo de Movimientos           [React]
    - Metadatos                     [React]
  Reportes
    - Kardex                        [React]

-- MODULOS SECUNDARIOS (redirigen a Angular/JSF) --

Hospitalizacion                     icon: Building2
  Admisiones
    - Admision de Pacientes         [-> Angular]
    - Atencion de Pacientes         [-> Angular]
    - Adm. Admisiones               [-> JSF]
    - Eliminacion Admision          [-> Angular]
  Ejecucion de Procesos
    - Estancia y Traslado           [-> JSF]

Reportes                            icon: FileText
  General
    - Consulta Externa              [-> Angular]
    - Historia Clinica              [-> Angular]
    - Facturacion                   [-> Angular]
    - Farmacia                      [-> Angular]
    - Hospitalizacion               [-> Angular]
    - Laboratorio                   [-> Angular]
    - Radiologia                    [-> Angular]
    - CRM                           [-> JSF]
  Historia Clinica
    - Formato Excel                 [-> Angular]
    - Plantilla JET                 [-> Angular]

PyP                                 icon: Heart         (si account.hasPyp)
  Administracion
    - Administracion de Programas   [-> Angular]

Laboratorio                         icon: FlaskConical  (si account.hasLab)
  Configuracion                     [-> JSF, 9 items]
  Ejecucion de Procesos
    - Recepcion de Pacientes        [-> Angular]
    - Toma de Muestra               [-> Angular]
    - Agendamiento Examenes         [-> JSF]
    - Consignacion Resultados       [-> JSF]

Radiologia                          icon: Scan          (si account.hasRad)
  Configuracion
    - Estudios de Radiologia        [-> JSF]
    - Duracion                      [-> Angular]
    - Salas                         [-> Angular]
    - Horarios de Sala              [-> JSF]
  Agendamiento
    - Recepcion de Pacientes        [-> Angular]
    - Agendamiento Estudios         [-> Angular]

Quirurgicos                         icon: Scissors      (si account.hasProcedure)
  [Todos -> JSF/Angular]

Banco Sangre                        icon: Droplet       (si account.hasBloodBank)
  [Todos -> JSF]

CRM                                 icon: MessageSquare (si account.hasCRM)
  [Todos -> JSF]

-- ADMINISTRACION TRANSVERSAL --

Administracion                      icon: Settings
  - Usuarios                        [React]
  - Perfiles                        [React]
  - Sedes                           [React - compartido con Facturacion]

Integracion                         icon: Puzzle        (si aplica)
  - Configuracion TISSUE            [-> Angular]
  - Diccionario de Datos            [-> Angular]

Tablero / Estadisticas              icon: BarChart3
  - Indicadores                     [-> medicaladmin-web via url_external]
```

---

## 5. Reglas de Redireccion

| Destino | Mecanismo | Ejemplo |
|---------|-----------|---------|
| **React nativo** | Navegacion interna SPA (React Router) | `/cit/agenda` |
| **Angular** | iframe embebido o `window.open()` con token | `/ma-principal/#/scheduleAppoinment` |
| **JSF** | `window.open()` a URL JSF con sesion compartida | `/MedicalAdminWEB/cit/pages/index.jsf` |
| **External** | `window.open()` con `url_external` + auth token | `medicaladmin-web/autoLogin/{token}` |

---

## 6. Datos Clave para Implementacion

### IDs de Modulos (med_appmodulo.id)
| ID | Nombre | Dominio PRD | Vistas React |
|----|--------|-------------|--------------|
| 1 | Consulta Externa | CIT | Si |
| 2 | Historia Clinica | HIS | Si |
| 3 | Facturacion | POS | Si |
| 4 | Farmacia | FAR | Si |
| 5 | Hospitalizacion | HOS | No (Angular) |
| 6 | Reportes | REP | No (Angular) |
| 7 | PyP | PYP | No (Angular) |
| 8 | Laboratorio | LAB | No |
| 9 | Radiologia | RAD | No |
| 10 | Quirurgicos | PQX | No |
| 11 | Banco Sangre | - | No |
| 12 | CRM | - | No |
| 13 | Integracion | - | No |
| 14 | Control de Accesos | MED | Si |
| 15 | Tablero/Estadisticas | - | External |

### Apps Angular con path activo (NO 'inContruction')
Total: ~40 apps con `path_angular` funcional. Estas son las que ya tienen vista Angular y deben ser accesibles desde el nuevo sidebar React.

### Tablas BD relevantes
- `med_appmodulo` -- Modulos (15 registros)
- `med_appmenu` -- Sub-modulos y apps (estructura arbol con `id_father`)
- `med_role` / `med_role_med_applink` -- Permisos por rol
- `gui_ma_menu` / `gui_ma_menu_item` -- Menus internos JSF (16 menus, estructura arbol)
- `med_account` -- Flags de modulos opcionales (`hasUrg`, `hasPyp`, etc.)
