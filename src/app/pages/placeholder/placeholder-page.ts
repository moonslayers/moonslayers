import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-placeholder-page',
  templateUrl: './placeholder-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderPage {
  private route = inject(ActivatedRoute);
  private translationService = inject(TranslationService);

  protected readonly label = computed(() => {
    const key = this.route.snapshot.data['labelKey'] as string | undefined;
    const translations = this.translationService.t();
    return key ? translations[key] : 'Sección';
  });

  protected readonly t = this.translationService.t;
}
