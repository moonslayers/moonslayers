import type { Language } from './translation-keys';

export interface ContactTranslatedContent {
  title: string;
  subtitle: string;
  description: string;
  githubLabel: string;
  ctaText: string;
  instructions: string;
}

export interface ContactData {
  githubUsername: string;
  githubUrl: string;
  repoUrl: string;
  translations: Record<Language, ContactTranslatedContent>;
}
