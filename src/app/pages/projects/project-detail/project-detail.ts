import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { TranslationService } from '../../../core/services/translation.service';
import { ProjectTechTagsComponent } from '../../../shared/project-tech-tags/project-tech-tags';
import { ProjectImageGalleryComponent } from '../../../shared/project-image-gallery/project-image-gallery';
import { ProjectPdfListComponent } from '../../../shared/project-pdf-list/project-pdf-list';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink, ProjectTechTagsComponent, ProjectImageGalleryComponent, ProjectPdfListComponent],
  templateUrl: './project-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly translationService = inject(TranslationService);

  protected readonly t = this.translationService.t;

  private readonly slug = signal(this.route.snapshot.paramMap.get('slug') ?? '');

  protected readonly project = computed(() => this.projectService.getBySlug(this.slug()));

  protected readonly projectTranslation = computed(() => {
    const p = this.project();
    return p?.translations[this.translationService.currentLang()];
  });

  protected readonly hasFeatures = computed(() => {
    const tr = this.projectTranslation();
    return tr?.features && tr.features.length > 0;
  });

  protected readonly hasImages = computed(() => {
    const p = this.project();
    return p?.media?.images && p.media.images.length > 0;
  });

  protected readonly hasPdfs = computed(() => {
    const p = this.project();
    return p?.media?.pdfs && p.media.pdfs.length > 0;
  });

  protected readonly hasLinks = computed(() => {
    const p = this.project();
    return p?.links && p.links.length > 0;
  });

  protected readonly hasLongDescription = computed(() => {
    return !!this.projectTranslation()?.longDescription;
  });
}
