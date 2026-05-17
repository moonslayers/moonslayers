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
] as const;

export type TranslationKey = typeof TRANSLATION_KEYS[number];

export type Translations = Record<TranslationKey, string>;

export type Language = 'es' | 'en';

export const LANG_STORAGE_KEY = 'portfolio-lang';

export const DEFAULT_LANG: Language = 'es';
