# Estructura de Menú desde BD — med_appmodulo + med_appmenu

## 15 Módulos (med_appmodulo)

| ID | Nombre | Ícono | En scope PRD |
|----|--------|-------|:---:|
| 1 | Consulta Externa | zmdi-search-in-page | ✅ CIT |
| 2 | Historia Clínica | zmdi-assignment-o | ✅ HIS |
| 3 | Facturación | zmdi-money | ✅ POS |
| 4 | Farmacia | zmdi-hospital-alt | ✅ FAR |
| 5 | Hospitalización | zmdi-hospital | ❌ |
| 6 | Reportes | zmdi-file-text | ❌ |
| 7 | PyP | zmdi-favorite | ❌ |
| 8 | Laboratorio | zmdi-eyedropper | ❌ |
| 9 | Radiología | zmdi-account-box-o | ❌ |
| 10 | Quirúrgicos | zmdi-plaster | ❌ |
| 11 | Banco Sangre | zmdi-drink | ❌ |
| 12 | CRM | zmdi-file | ❌ |
| 13 | Integración | zmdi-puzzle-piece | ❌ |
| 14 | Control de Accesos | zmdi-key | ✅ MED (parcial) |
| 15 | Tablero / Estadísticas | zmdi-view-dashboard | ❌ |

## Árbol de Menú (med_appmenu, active=1)

### 1. Consulta Externa
```
├── Agendamiento (id:2)
│   ├── Creación de Citas Médicas (path: scheduleAppoinment)
│   ├── Creación de Otros Eventos (path: createOtherEvents)
│   ├── Recepción de Paciente (path: citReceptionPatient)
│   ├── Administración de Citas Médicas (path: inContruction → JSF)
│   ├── Administración de Otros Eventos (path: inContruction → JSF)
│   └── Administración motivos de cancelación (path: citReasonDelete)
│
└── Configuración General (id:1)
    ├── Administración de Horarios Consulta Externa (path: inContruction → JSF)
    ├── Administración de Consultorios (path: inContruction → JSF)
    └── Administración de Duración de Citas (path: inContruction → JSF)
```

### 2. Historia Clínica
```
├── Historia Clínica (id:42)
│   ├── Administración de Pacientes (path: adminHisPatient)
│   ├── Atención de Pacientes (path: attentionPatient)
│   ├── Historia Clínica Externa (path: hisHistoryExternal)
│   └── Evaluación por Enfermería (path: nursingEvaluation)
│
├── Configuración General (id:21)
│   ├── Configuración Formatos Historia Clínica (path: inContruction → JSF)
│   ├── Administración de Profesionales de la salud (path: adminProfSld)
│   ├── Administración de Medicamentos e Insumos (path: inContruction → JSF)
│   ├── Administración de indicadores de pacientes (path: inContruction → JSF)
│   ├── Configuración Áreas Funcionales (path: inContruction → JSF)
│   ├── Configuración de Servicio (path: inContruction → JSF)
│   ├── Configuración de Otros Procedimientos (path: inContruction → JSF)
│   ├── Configuración de Plantillas de Órdenes Médicas (path: inContruction → JSF)
│   ├── Administración de lista de chequeo (path: inContruction → JSF)
│   ├── Administración de reportes sobre indicadores (path: inContruction → JSF)
│   ├── Administración de Metadatos (path: inContruction → JSF)
│   ├── Administración de Especialidades (path: hisEspeciality)
│   ├── Administración de tipo de cita (path: adminCitType)
│   └── Administración de fórmulas para consultorios (path: adminHisFormulationOrder)
│
├── Configuración Hospitalización (id:26)
│   ├── Administración de Camas (inContruction)
│   ├── Administración de Piso (inContruction)
│   ├── Administración de Pabellón (inContruction)
│   ├── Administración de Habitación (inContruction)
│   └── Administración de Ocupaciones (inContruction → JSF)
│
├── Consulta Externa (id:150) — sub-módulo dentro de HC (¿legacy?)
│
└── Hospitalización (id:151)
    ├── Evaluación Triage (inContruction)
    ├── Atención de pacientes Hospitalizados (inContruction)
    └── Tablero de Control Enfermería (inContruction)
```

### 3. Facturación
```
├── Ejecución de Procesos (id:15)
│   ├── Administración de Orden de Facturación (path: adminOrders)
│   ├── Administración de Facturas (path: billAdministration)
│   ├── Administración de Clientes (path: inContruction → JSF)
│   ├── Administración de Rips (path: adminRips)
│   ├── Estado de cuenta pacientes hospitalizados (inContruction)
│   ├── Enrutamiento de Órdenes (inContruction)
│   ├── Administración eliminación de factura (inContruction)
│   └── Administración de Lista de Pacientes (path: admPatientList)
│
└── Configuración General (id:24)
    ├── Administración de Medios de Pago (inContruction → JSF)
    ├── Administración de Rangos de Facturación (inContruction → JSF)
    ├── Administración Manuales Tarifarios (inContruction → JSF)
    ├── Administración de Tarifas de Facturación (inContruction → JSF)
    ├── Administración de Lista de Precios de Medicamentos e Insumos (inContruction → JSF)
    ├── Administración de Tarifas de Medicamentos (inContruction → JSF)
    ├── Administración de Convenio (inContruction → JSF)
    ├── Administración Centros de Atención (inContruction → JSF)
    ├── Administración de paquetes de facturación (inContruction)
    ├── Administración de Sedes (path: adminSeat)
    ├── Administración de Tarifas de Facturación Proveedoras (inContruction)
    └── Administración de Convenio Proveedor (inContruction)
```

### 4. Farmacia
```
├── Configuración (id:37)
│   ├── Administración de Bodegas (path: adminWarehouse)
│   ├── Administración Tipo de Artículos (path: adminItemType)
│   ├── Administración Tipo de Movimientos (path: adminTransactionType)
│   └── Administración de Metadatos (path: adminMetadata)
│
├── Ejecución de Procesos (id:149)
│   ├── Administración de Artículos (path: admin_article)
│   ├── Creación Movimientos Inventario (path: inventoryMovements)
│   ├── Entrega de Artículos (path: dispatchIndex)
│   └── Administración Existencia en Inventario (inContruction)
│
└── Reporte (id:180)
    └── Kardex (path: kardex)
```

### 5-15. Módulos fuera de scope PRD
(Hospitalización, Reportes, PyP, Laboratorio, Radiología, Quirúrgicos, Banco Sangre, CRM, Integración, Control de Accesos, Tablero)
→ Aparecen en sidebar pero redirigen a versión Angular/JSF

## Notas
- `path_angular = 'inContruction'` → Solo JSF, no tiene vista Angular
- Items con `path_angular` real → Tiene vista Angular activa
- La nueva UI React reemplaza los items en scope del PRD
- Los items fuera de scope mantienen redirect a Angular
