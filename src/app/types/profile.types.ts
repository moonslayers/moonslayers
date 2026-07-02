import type { Language } from './translation-keys';
import type { ProfileTranslatedContent } from './profile-translation.types';

export interface Experience {
  key: string;
  company: string;
  period: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  period: string;
}

export interface SkillGroup {
  categoryKey: string;
  skills: string[];
}

export interface LanguageProficiency {
  name: string;
  levelKey: string;
}

export interface Certification {
  issuer?: string;
  date?: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website?: string;
  skills: SkillGroup[];
  languages: LanguageProficiency[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  translations: Record<Language, ProfileTranslatedContent>;
}
