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
    fr: {
      'common.save': 'Enregistrer',
      'common.cancel': 'Annuler',
      'common.delete': 'Supprimer',
      'common.edit': 'Modifier',
      'common.create': 'Créer',
      'common.search': 'Rechercher',
      'common.filter': 'Filtrer',
      'common.confirm': 'Confirmer',
      'common.back': 'Retour',
      'common.next': 'Suivant',
      'common.prev': 'Précédent',
      'common.close': 'Fermer',
      'common.add': 'Ajouter',
      'common.view': 'Voir',
      'common.export': 'Exporter',
      'common.import': 'Importer',
      'common.print': 'Imprimer',
      'common.actions': 'Actions',
      'common.status': 'Statut',
      'common.date': 'Date',
      'common.from': 'De',
      'common.to': 'À',
      'common.all': 'Tous',
      'common.none': 'Aucun',
      'common.yes': 'Oui',
      'common.no': 'Non',
      'common.loading': 'Chargement...',
      'common.no_data': 'Aucune donnée',
      'common.required': 'Requis',

      'menu.home': 'Accueil',
      'menu.consulta_externa': 'Consultation Externe',
      'menu.historia_clinica': 'Dossier Médical',
      'menu.facturacion': 'Facturation',
      'menu.farmacia': 'Pharmacie',
      'menu.agendamiento': 'Planification',
      'menu.config_general': 'Configuration Générale',
      'menu.ejecucion_procesos': 'Exécution de Processus',

      'app.creacion_citas_medicas': 'Création de Rendez-vous Médicaux',
      'app.recepcion_paciente': 'Réception Patient',
      'app.atencion_pacientes': 'Soins aux Patients',
      'app.config_servicio': 'Configuration du Service',
      'app.otros_procedimientos': 'Autres Procédures',
      'app.lista_chequeo': 'Gestion de Listes de Vérification',
      'app.ocupaciones': 'Gestion des Professions',
      'app.entrega_articulos': 'Livraison d\'Articles',
      'app.admin_articulos': 'Gestion des Articles',
      'app.convenios': 'Gestion de Conventions',
      'app.tarifas': 'Gestion des Manuels Tarifaires',
      'app.admin_facturas': 'Gestion des Factures',
      'app.crear_orden': 'Gestion des Ordres de Facturation',

      'patient.name': 'Nom',
      'patient.document': 'Document d\'identité',
      'patient.gender': 'Genre',
      'patient.birthdate': 'Date de naissance',
      'patient.phone': 'Téléphone',
      'patient.email': 'Email',
      'patient.occupation': 'Profession',
      'patient.marital_status': 'État civil',
      'patient.education': 'Niveau d\'études',
      'patient.nationality': 'Nationalité',

      'appt.title': 'Rendez-vous',
      'appt.priority': 'Prioritaire',
      'appt.confirmed': 'Confirmé',
      'appt.pending': 'En attente',
      'appt.waiting': 'En attente',
      'appt.attended': 'Effectué',
      'appt.cancelled': 'Annulé',
      'appt.no_show': 'Absence',

      'comingsoon.title': 'Bientôt disponible',
      'comingsoon.body': 'Cette application est en cours de développement. Elle fera bientôt partie de la nouvelle version de MedicalAdmin.',
      'comingsoon.badge': 'Nouvelle Version — En Développement',
      'comingsoon.notify': 'Me notifier',
      'comingsoon.timeline': 'Feuille de route',
      'comingsoon.phase1': 'Phase 1',
      'comingsoon.phase1_desc': 'Conception et prototypage',
      'comingsoon.phase2': 'Phase 2',
      'comingsoon.phase2_desc': 'Implémentation backend (Spring Boot)',
      'comingsoon.phase3': 'Phase 3',
      'comingsoon.phase3_desc': 'Frontend Angular + intégration',
      'comingsoon.phase4': 'Phase 4',
      'comingsoon.phase4_desc': 'QA et déploiement',
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
