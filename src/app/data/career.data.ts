import type { CareerData } from '../types/career.types';
import { RAW_EXPERIENCE_ENTRIES, RAW_EXPERIENCE_TRANSLATIONS_ES, RAW_EXPERIENCE_TRANSLATIONS_EN } from './experience.data';

const ES_ENTRIES = RAW_EXPERIENCE_TRANSLATIONS_ES;

const EN_ENTRIES = RAW_EXPERIENCE_TRANSLATIONS_EN;

export const CAREER_DATA: CareerData = {
  stats: {
    yearsExperience: 4,
    companies: 5,
    technologies: 20,
  },
  entries: RAW_EXPERIENCE_ENTRIES,
  translations: {
    es: { entries: ES_ENTRIES },
    en: { entries: EN_ENTRIES },
  },
};
