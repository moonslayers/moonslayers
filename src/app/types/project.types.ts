import type { Language } from './translation-keys';
import type { ProjectTranslatedContent } from './project-translation.types';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectPdf {
  name: string;
  path: string;
  size?: string;
}

export interface ProjectMedia {
  images?: ProjectImage[];
  pdfs?: ProjectPdf[];
}

export interface ProjectTechGroup {
  category: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
  icon: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  MAINTENANCE: 'maintenance',
} as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];
export { PROJECT_STATUS };

export interface Project {
  id: string;
  slug: string;
  thumbnail?: string;
  media: ProjectMedia;
  links?: ProjectLink[];
  featureIcons?: string[];
  role?: string;
  period?: string;
  client?: string;
  status: ProjectStatus;
  translations: Record<Language, ProjectTranslatedContent>;
}
