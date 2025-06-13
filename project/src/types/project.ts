export type Language = 'en' | 'ar' | 'tr';

export type ProjectStatus = 'active' | 'completed' | 'planned';

export type ProjectCategory = 'environment' | 'education' | 'health' | 'technology' | 'social';

export interface Project {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: ProjectCategory;
  status: ProjectStatus;
  image: string;
}

export interface CreateProjectDTO {
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: ProjectCategory;
  status: ProjectStatus;
  image: string;
}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {
  id: string;
}