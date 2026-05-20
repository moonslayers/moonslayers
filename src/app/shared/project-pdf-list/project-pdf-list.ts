import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ProjectPdf } from '../../types/project.types';

@Component({
  selector: 'app-project-pdf-list',
  standalone: true,
  templateUrl: './project-pdf-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPdfListComponent {
  pdfs = input.required<ProjectPdf[]>();
}
