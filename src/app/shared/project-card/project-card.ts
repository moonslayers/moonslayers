import { Component, input, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project, ProjectStatus } from '../../types/project.types';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  private readonly translationService = inject(TranslationService);
  protected readonly t = this.translationService.t;

  project = input.required<Project>();

  protected readonly projectTranslation = computed(() =>
    this.project().translations[this.translationService.currentLang()]
  );

  protected readonly flattenedTech = computed(() =>
    this.projectTranslation()?.techStack.flatMap(g => g.items).slice(0, 6) ?? []
  );

  protected readonly statusBadgeClass: Record<ProjectStatus, string> = {
    completed: 'bg-success',
    'in-progress': 'bg-warning text-dark',
    maintenance: 'bg-info text-dark',
  };

  protected readonly statusTranslationKey: Record<ProjectStatus, string> = {
    completed: 'projects.status.completed',
    'in-progress': 'projects.status.inProgress',
    maintenance: 'projects.status.maintenance',
  };
}
