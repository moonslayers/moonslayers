export interface TranslatableCareerEntry {
  role: string;
  description: string;
  highlights?: string[];
}

export interface CareerTranslatedContent {
  entries: TranslatableCareerEntry[];
}
