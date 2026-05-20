export const TRANSLATION_KEYS = [
  'sidebar.dashboard',
  'sidebar.dashboards',
  'sidebar.logout',
  'sidebar.profile',
  'sidebar.tiempoProduccion',
  'sidebar.respuestasPromedio',
  'sidebar.proyectos',
  'sidebar.career',
  'sidebar.contacto',
  'sidebar.section.career',
  'sidebar.section.info',
  'topbar.search.placeholder.default',
  'topbar.search.placeholder.dashboard',
  'topbar.search.placeholder.tiempoProduccion',
  'topbar.search.placeholder.respuestasPromedio',
  'topbar.search.placeholder.profile',
  'topbar.search.placeholder.projects',
  'topbar.search.placeholder.career',
  'topbar.search.placeholder.contact',
  'topbar.notifications.title',
  'topbar.notifications.empty',
  'topbar.notifications.projectAdded',
  'topbar.notifications.profileViews',
  'topbar.notifications.newSkill',
  'topbar.notifications.time1',
  'topbar.notifications.time2',
  'topbar.notifications.time3',
  'topbar.notifications.viewAll',
  'placeholder.construction',
  'aria.toggleSidebar',
  'aria.search',
  'aria.theme',
  'aria.notifications',
  'aria.language',
  'aria.closeMenu',

  // Dashboard stats
  'dashboard.stat.experience',
  'dashboard.stat.projects',
  'dashboard.stat.technologies',
  'dashboard.stat.certifications',

  // Dashboard chart titles
  'dashboard.chart.skillsTitle',
  'dashboard.chart.projectsTitle',

  // Dashboard skill labels (for doughnut chart)
  'dashboard.skill.frontend',
  'dashboard.skill.backend',
  'dashboard.skill.devops',
  'dashboard.skill.databases',
  'dashboard.skill.leadership',

  // Dashboard project cards
  'dashboard.project.floricultora',
  'dashboard.project.floricultoraDesc',
  'dashboard.project.credits',
  'dashboard.project.creditsDesc',
  'dashboard.project.sei',
  'dashboard.project.seiDesc',

  // Dashboard reference cards to other dashboards
  'dashboard.ref.productionTime',
  'dashboard.ref.productionTimeDesc',
  'dashboard.ref.avgResponses',
  'dashboard.ref.avgResponsesDesc',

  // Tiempo Producción - stats
  'tiempoProduccion.stat.projects',
  'tiempoProduccion.stat.yearsInProd',
  'tiempoProduccion.stat.technologies',
  'tiempoProduccion.stat.clients',

  // Tiempo Producción - sections
  'tiempoProduccion.section.timeline',
  'tiempoProduccion.section.techFreq',

  // Tiempo Producción - projects
  'tiempoProduccion.project.covid',
  'tiempoProduccion.project.psicologica',
  'tiempoProduccion.project.floricultora',
  'tiempoProduccion.project.almacenes',
  'tiempoProduccion.project.creditos',
  'tiempoProduccion.project.sei',
  'tiempoProduccion.project.estimulos',
  'tiempoProduccion.project.landing',

  // Tiempo Producción - roles
  'tiempoProduccion.role.intern',
  'tiempoProduccion.role.fullstack',
  'tiempoProduccion.role.frontend',
  'tiempoProduccion.role.leader',
  'tiempoProduccion.role.freelance',

  // Tiempo Producción - periods
  'tiempoProduccion.period.6months',
  'tiempoProduccion.period.1year',
  'tiempoProduccion.period.ongoing',

  // Tiempo Producción - chart
  'tiempoProduccion.chart.projectsLabel',

  // Dashboard page header
  'dashboard.pageSubtitle',
  'dashboard.section.constancias',

  // Tiempo Producción page header
  'tiempoProduccion.pageSubtitle',

  // Respuestas Promedio page
  'respuestasPromedio.pageSubtitle',
  'respuestasPromedio.hero.responseTime',
  'respuestasPromedio.hero.responseTimeLabel',
  'respuestasPromedio.hero.responseTimeDesc',
  'respuestasPromedio.kpi.storyPoints',
  'respuestasPromedio.kpi.storyPointsDesc',
  'respuestasPromedio.kpi.tickets',
  'respuestasPromedio.kpi.ticketsDesc',
  'respuestasPromedio.kpi.myTickets',
  'respuestasPromedio.kpi.myTicketsDesc',
  'respuestasPromedio.kpi.prReview',
  'respuestasPromedio.kpi.prReviewDesc',
  'respuestasPromedio.section.resolution',
  'respuestasPromedio.section.distribution',
  'respuestasPromedio.section.leadership',
  'respuestasPromedio.section.techStack',
  'respuestasPromedio.chart.resolutionLabel',
  'respuestasPromedio.chart.myTicketsLabel',
  'respuestasPromedio.chart.teamTicketsLabel',
  'respuestasPromedio.chart.reviewedLabel',
  'respuestasPromedio.chart.notReviewedLabel',
  'respuestasPromedio.radar.codeQuality',
  'respuestasPromedio.radar.teamLeadership',
  'respuestasPromedio.radar.delivery',
  'respuestasPromedio.radar.architecture',
  'respuestasPromedio.radar.devops',
  'respuestasPromedio.tech.frontend',
  'respuestasPromedio.tech.backend',
  'respuestasPromedio.tech.devops',
  'respuestasPromedio.tech.databases',

  // Projects page
  'projects.pageTitle',
  'projects.pageSubtitle',

  // Project detail
  'projects.detail.backToProjects',
  'projects.detail.techStack',
  'projects.detail.features',
  'projects.detail.gallery',
  'projects.detail.resources',
  'projects.detail.links',
  'projects.detail.role',
  'projects.detail.period',
  'projects.detail.client',
  'projects.detail.technologies',
  'projects.detail.info',

  // Project status
  'projects.status.completed',
  'projects.status.inProgress',
  'projects.status.maintenance',

  // No results / filters
  'projects.noProjects',
  'projects.filter.all',

  // Project card
  'projects.viewMore',
] as const;

export type TranslationKey = typeof TRANSLATION_KEYS[number];

export type Translations = Record<TranslationKey, string>;

export type Language = 'es' | 'en';

export const LANG_STORAGE_KEY = 'portfolio-lang';

export const DEFAULT_LANG: Language = 'es';
