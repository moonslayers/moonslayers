import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ProjectCardComponent } from '../../shared/project-card/project-card';
import { ProjectService } from '../../core/services/project.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCardComponent],
  templateUrl: './projects-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  private readonly projectService = inject(ProjectService);
  private readonly translationService = inject(TranslationService);

  protected readonly t = this.translationService.t;

  protected readonly projects = this.projectService.projectList;
}
