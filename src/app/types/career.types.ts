import type { Language } from './translation-keys';
import type { CareerTranslatedContent } from './career-translation.types';

export interface CareerEntry {
  key: string;
  company: string;
  period: string;
  startYear: number;
  endYear?: number;
  technologies: string[];
}

export interface CareerStats {
  yearsExperience: number;
  companies: number;
  technologies: number;
}

export interface CareerData {
  stats: CareerStats;
  entries: CareerEntry[];
  translations: Record<Language, CareerTranslatedContent>;
}
