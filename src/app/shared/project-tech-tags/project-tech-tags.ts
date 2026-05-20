import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ProjectTechGroup } from '../../types/project.types';

@Component({
  selector: 'app-project-tech-tags',
  standalone: true,
  templateUrl: './project-tech-tags.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTechTagsComponent {
  techGroups = input.required<ProjectTechGroup[]>();
}
