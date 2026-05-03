/**
 * MedicalAdmin — i18n runtime (mockups)
 * Lightweight key-based translation. Maps data-i18n attributes to localized strings.
 * Persists language in localStorage; defaults to 'es' (Colombia).
 *
 * Uso en HTML:
 *   <span data-i18n="common.save">Guardar</span>
 *   <input placeholder="Buscar..." data-i18n-placeholder="common.search" />
 *
 * Para cambiar idioma:
 *   window.MA_i18n.setLang('en');
 */
(function () {
  'use strict';

  const DICT = {
    es: {
      'common.save': 'Guardar',
      'common.cancel': 'Cancelar',
      'common.delete': 'Eliminar',
      'common.edit': 'Editar',
      'common.create': 'Crear',
      'common.search': 'Buscar',
      'common.filter': 'Filtrar',
      'common.confirm': 'Confirmar',
      'common.back': 'Volver',
      'common.next': 'Siguiente',
      'common.prev': 'Anterior',
      'common.close': 'Cerrar',
      'common.add': 'Agregar',
      'common.view': 'Ver',
      'common.export': 'Exportar',
      'common.import': 'Importar',
      'common.print': 'Imprimir',
      'common.actions': 'Acciones',
      'common.status': 'Estado',
      'common.date': 'Fecha',
      'common.from': 'Desde',
      'common.to': 'Hasta',
      'common.all': 'Todos',
      'common.none': 'Ninguno',
      'common.yes': 'Sí',
      'common.no': 'No',
      'common.loading': 'Cargando...',
      'common.no_data': 'Sin datos',
      'common.required': 'Obligatorio',

      'menu.home': 'Inicio',
      'menu.consulta_externa': 'Consulta Externa',
      'menu.historia_clinica': 'Historia Clínica',
      'menu.facturacion': 'Facturación',
      'menu.farmacia': 'Farmacia',
      'menu.agendamiento': 'Agendamiento',
      'menu.config_general': 'Configuración General',
      'menu.ejecucion_procesos': 'Ejecución de Procesos',

      'app.creacion_citas_medicas': 'Creación de Citas Médicas',
      'app.recepcion_paciente': 'Recepción de Paciente',
      'app.atencion_pacientes': 'Atención de Pacientes',
      'app.config_servicio': 'Configuración de Servicio',
      'app.otros_procedimientos': 'Configuración de Otros Procedimientos',
      'app.lista_chequeo': 'Administración de lista de chequeo',
      'app.ocupaciones': 'Administración de Ocupaciones',
      'app.entrega_articulos': 'Entrega de Artículos',
      'app.admin_articulos': 'Administración de Artículos',
      'app.convenios': 'Administración de Convenio',
      'app.tarifas': 'Administración Manuales Tarifarios',
      'app.admin_facturas': 'Administración de Facturas',
      'app.crear_orden': 'Administración de Ordenes de Facturación',

      'patient.name': 'Nombre',
      'patient.document': 'Documento',
      'patient.gender': 'Género',
      'patient.birthdate': 'Fecha de Nacimiento',
      'patient.phone': 'Teléfono',
      'patient.email': 'Correo electrónico',
      'patient.occupation': 'Ocupación',
      'patient.marital_status': 'Estado Civil',
      'patient.education': 'Escolaridad',
      'patient.nationality': 'Nacionalidad',

      'appt.title': 'Cita',
      'appt.priority': 'Prioritaria',
      'appt.confirmed': 'Confirmada',
      'appt.pending': 'Pendiente',
      'appt.waiting': 'En espera',
      'appt.attended': 'Atendida',
      'appt.cancelled': 'Cancelada',
      'appt.no_show': 'Inasistencia',

      'comingsoon.title': 'Próximamente',
      'comingsoon.body': 'Esta aplicación está en desarrollo activo. Pronto formará parte de la nueva versión de MedicalAdmin.',
      'comingsoon.badge': 'Nueva Versión — En Desarrollo',
      'comingsoon.notify': 'Notificarme',
      'comingsoon.timeline': 'Roadmap',
      'comingsoon.phase1': 'Fase 1',
      'comingsoon.phase1_desc': 'Diseño y prototipado',
      'comingsoon.phase2': 'Fase 2',
      'comingsoon.phase2_desc': 'Implementación backend (Spring Boot)',
      'comingsoon.phase3': 'Fase 3',
      'comingsoon.phase3_desc': 'Frontend Angular + integración',
      'comingsoon.phase4': 'Fase 4',
      'comingsoon.phase4_desc': 'QA y release',
    },
    en: {
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.create': 'Create',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.confirm': 'Confirm',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.prev': 'Previous',
      'common.close': 'Close',
      'common.add': 'Add',
      'common.view': 'View',
      'common.export': 'Export',
      'common.import': 'Import',
      'common.print': 'Print',
      'common.actions': 'Actions',
      'common.status': 'Status',
      'common.date': 'Date',
      'common.from': 'From',
      'common.to': 'To',
      'common.all': 'All',
      'common.none': 'None',
      'common.yes': 'Yes',
      'common.no': 'No',
      'common.loading': 'Loading...',
      'common.no_data': 'No data',
      'common.required': 'Required',

      'menu.home': 'Home',
      'menu.consulta_externa': 'Outpatient',
      'menu.historia_clinica': 'Medical Records',
      'menu.facturacion': 'Billing',
      'menu.farmacia': 'Pharmacy',
      'menu.agendamiento': 'Scheduling',
      'menu.config_general': 'General Settings',
      'menu.ejecucion_procesos': 'Process Execution',

      'app.creacion_citas_medicas': 'Create Medical Appointments',
      'app.recepcion_paciente': 'Patient Reception',
      'app.atencion_pacientes': 'Patient Attention',
      'app.config_servicio': 'Service Configuration',
      'app.otros_procedimientos': 'Other Procedures Configuration',
      'app.lista_chequeo': 'Checklist Management',
      'app.ocupaciones': 'Occupations Management',
      'app.entrega_articulos': 'Articles Delivery',
      'app.admin_articulos': 'Articles Management',
      'app.convenios': 'Insurance Plan Management',
      'app.tarifas': 'Tariff Manual Management',
      'app.admin_facturas': 'Invoice Management',
      'app.crear_orden': 'Billing Order Management',

      'patient.name': 'Name',
      'patient.document': 'ID Document',
      'patient.gender': 'Gender',
      'patient.birthdate': 'Date of Birth',
      'patient.phone': 'Phone',
      'patient.email': 'Email',
      'patient.occupation': 'Occupation',
      'patient.marital_status': 'Marital Status',
      'patient.education': 'Education',
      'patient.nationality': 'Nationality',

      'appt.title': 'Appointment',
      'appt.priority': 'Priority',
      'appt.confirmed': 'Confirmed',
      'appt.pending': 'Pending',
      'appt.waiting': 'Waiting',
      'appt.attended': 'Attended',
      'appt.cancelled': 'Cancelled',
      'appt.no_show': 'No Show',

      'comingsoon.title': 'Coming Soon',
      'comingsoon.body': 'This application is under active development. It will soon be part of the new MedicalAdmin version.',
      'comingsoon.badge': 'New Version — In Development',
      'comingsoon.notify': 'Notify me',
      'comingsoon.timeline': 'Roadmap',
      'comingsoon.phase1': 'Phase 1',
      'comingsoon.phase1_desc': 'Design & prototyping',
      'comingsoon.phase2': 'Phase 2',
      'comingsoon.phase2_desc': 'Backend implementation (Spring Boot)',
      'comingsoon.phase3': 'Phase 3',
      'comingsoon.phase3_desc': 'Angular frontend + integration',
      'comingsoon.phase4': 'Phase 4',
      'comingsoon.phase4_desc': 'QA and release',
    },
    pt: {
      'common.save': 'Salvar',
      'common.cancel': 'Cancelar',
      'common.delete': 'Excluir',
      'common.edit': 'Editar',
      'common.create': 'Criar',
      'common.search': 'Buscar',
      'common.filter': 'Filtrar',
      'common.confirm': 'Confirmar',
      'common.back': 'Voltar',
      'common.next': 'Próximo',
      'common.prev': 'Anterior',
      'common.close': 'Fechar',
      'common.add': 'Adicionar',
      'common.view': 'Ver',
      'common.export': 'Exportar',
      'common.import': 'Importar',
      'common.print': 'Imprimir',
      'common.actions': 'Ações',
      'common.status': 'Status',
      'common.date': 'Data',
      'common.from': 'De',
      'common.to': 'Até',
      'common.all': 'Todos',
      'common.none': 'Nenhum',
      'common.yes': 'Sim',
      'common.no': 'Não',
      'common.loading': 'Carregando...',
      'common.no_data': 'Sem dados',
      'common.required': 'Obrigatório',

      'menu.home': 'Início',
      'menu.consulta_externa': 'Consulta Externa',
      'menu.historia_clinica': 'Prontuário',
      'menu.facturacion': 'Faturamento',
      'menu.farmacia': 'Farmácia',
      'menu.agendamiento': 'Agendamento',
      'menu.config_general': 'Configuração Geral',
      'menu.ejecucion_procesos': 'Execução de Processos',

      'app.creacion_citas_medicas': 'Criação de Consultas Médicas',
      'app.recepcion_paciente': 'Recepção de Paciente',
      'app.atencion_pacientes': 'Atendimento de Pacientes',
      'app.config_servicio': 'Configuração de Serviço',
      'app.otros_procedimientos': 'Outros Procedimentos',
      'app.lista_chequeo': 'Lista de Verificação',
      'app.ocupaciones': 'Ocupações',
      'app.entrega_articulos': 'Entrega de Artigos',
      'app.admin_articulos': 'Administração de Artigos',
      'app.convenios': 'Administração de Convênios',
      'app.tarifas': 'Manuais Tarifários',
      'app.admin_facturas': 'Administração de Faturas',
      'app.crear_orden': 'Ordens de Faturamento',

      'patient.name': 'Nome',
      'patient.document': 'Documento',
      'patient.gender': 'Gênero',
      'patient.birthdate': 'Data de Nascimento',
      'patient.phone': 'Telefone',
      'patient.email': 'E-mail',
      'patient.occupation': 'Ocupação',
      'patient.marital_status': 'Estado Civil',
      'patient.education': 'Escolaridade',
      'patient.nationality': 'Nacionalidade',

      'appt.title': 'Consulta',
      'appt.priority': 'Prioritária',
      'appt.confirmed': 'Confirmada',
      'appt.pending': 'Pendente',
      'appt.waiting': 'Em espera',
      'appt.attended': 'Atendida',
      'appt.cancelled': 'Cancelada',
      'appt.no_show': 'Falta',

      'comingsoon.title': 'Em breve',
      'comingsoon.body': 'Esta aplicação está em desenvolvimento ativo. Em breve fará parte da nova versão do MedicalAdmin.',
      'comingsoon.badge': 'Nova Versão — Em Desenvolvimento',
      'comingsoon.notify': 'Me avisar',
      'comingsoon.timeline': 'Roadmap',
      'comingsoon.phase1': 'Fase 1',
      'comingsoon.phase1_desc': 'Design e prototipagem',
      'comingsoon.phase2': 'Fase 2',
      'comingsoon.phase2_desc': 'Implementação backend (Spring Boot)',
      'comingsoon.phase3': 'Fase 3',
      'comingsoon.phase3_desc': 'Frontend Angular + integração',
      'comingsoon.phase4': 'Fase 4',
      'comingsoon.phase4_desc': 'QA e release',
    },
  };

  function getLang() {
    try { return localStorage.getItem('ma_lang') || 'es'; } catch (e) { return 'es'; }
  }
  function setLang(lang) {
    if (!DICT[lang]) { console.warn('i18n: idioma no soportado:', lang); return; }
    try { localStorage.setItem('ma_lang', lang); } catch (e) {}
    apply();
  }
  function t(key) {
    const lang = getLang();
    return (DICT[lang] && DICT[lang][key]) || (DICT.es && DICT.es[key]) || key;
  }
  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = t(key);
      if (val) el.setAttribute('title', val);
    });
    document.documentElement.setAttribute('lang', getLang());
  }

  window.MA_i18n = { t, setLang, getLang, apply, DICT };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
