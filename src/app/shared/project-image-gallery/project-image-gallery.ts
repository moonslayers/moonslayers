import { Component, input, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { ProjectImage } from '../../types/project.types';

@Component({
  selector: 'app-project-image-gallery',
  standalone: true,
  templateUrl: './project-image-gallery.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectImageGalleryComponent {
  images = input.required<ProjectImage[]>();

  selectedImageIndex = signal<number | null>(null);

  selectedImage = computed(() => {
    const index = this.selectedImageIndex();
    return index !== null ? this.images()[index] : null;
  });

  openImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  closeImage(): void {
    this.selectedImageIndex.set(null);
  }

  prevImage(): void {
    const current = this.selectedImageIndex();
    if (current === null) return;
    const prev = current === 0 ? this.images().length - 1 : current - 1;
    this.selectedImageIndex.set(prev);
  }

  nextImage(): void {
    const current = this.selectedImageIndex();
    if (current === null) return;
    const next = current === this.images().length - 1 ? 0 : current + 1;
    this.selectedImageIndex.set(next);
  }
}
