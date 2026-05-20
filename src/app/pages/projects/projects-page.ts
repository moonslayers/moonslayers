import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCardComponent } from '../../shared/project-card/project-card';
import { ProjectService } from '../../core/services/project.service';
import { TranslationService } from '../../core/services/translation.service';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCardComponent, FormsModule],
  templateUrl: './projects-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  private readonly projectService = inject(ProjectService);
  private readonly translationService = inject(TranslationService);
  private readonly searchService = inject(SearchService);

  protected readonly t = this.translationService.t;

  protected readonly projects = this.projectService.projectList;

  protected readonly statusFilter = signal<string>('all');

  protected readonly statusOptions = [
    { key: 'all', label: 'projects.filter.all' },
    { key: 'completed', label: 'projects.status.completed' },
    { key: 'in-progress', label: 'projects.status.inProgress' },
    { key: 'maintenance', label: 'projects.status.maintenance' },
  ];

  protected readonly filteredProjects = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    const status = this.statusFilter();
    const projects = this.projectService.projectList();

    return projects.filter(p => {
      const tr = p.translations[this.translationService.currentLang()];

      // Filter by status
      if (status !== 'all' && p.status !== status) return false;

      // Filter by search text
      if (search) {
        const searchableText = [
          tr.title,
          tr.subtitle,
          tr.description,
          tr.longDescription,
          ...tr.techStack.flatMap(g => g.items),
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchableText.includes(search)) return false;
      }

      return true;
    });
  });
}
