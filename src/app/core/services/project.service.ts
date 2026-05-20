import { Injectable, computed, signal } from '@angular/core';
import { Project } from '../../types/project.types';
import { PROJECTS_DATA } from '../../data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly _projects = signal<Project[]>(PROJECTS_DATA);

  readonly projects = this._projects.asReadonly();

  readonly projectList = computed(() => this.projects());

  getBySlug(slug: string): Project | undefined {
    return this._projects().find(p => p.slug === slug);
  }
}
