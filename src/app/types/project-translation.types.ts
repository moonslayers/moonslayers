export interface ProjectTranslatedFeature {
  title: string;
  description: string;
}

export interface ProjectTranslatedTechGroup {
  category: string;
  items: string[];
}

export interface ProjectTranslatedContent {
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  features: ProjectTranslatedFeature[];
  techStack: ProjectTranslatedTechGroup[];
}


