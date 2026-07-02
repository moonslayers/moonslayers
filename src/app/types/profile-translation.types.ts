export interface TranslatableExperience {
  role: string;
  description: string;
  highlights?: string[];
}

export interface TranslatableEducation {
  degree: string;
  description?: string;
}

export interface TranslatableCertification {
  name: string;
}

export interface ProfileTranslatedContent {
  role: string;
  location: string;
  bio: string;
  experience: TranslatableExperience[];
  education: TranslatableEducation[];
  certifications: TranslatableCertification[];
}
