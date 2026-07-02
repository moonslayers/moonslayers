import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { SearchService } from '../../core/services/search.service';
import { CAREER_DATA } from '../../data/career.data';

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [],
  templateUrl: './career-page.html',
  styleUrl: './career-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerPage {
  private readonly translationService = inject(TranslationService);
  private readonly searchService = inject(SearchService);

  protected readonly t = this.translationService.t;
  protected readonly career = CAREER_DATA;
  protected readonly careerTranslation = computed(() =>
    this.career.translations[this.translationService.currentLang()]
  );

  protected readonly techColors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'] as const;

  protected readonly filteredEntries = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    if (!search) return this.career.entries;

    const tr = this.careerTranslation();
    return this.career.entries.filter((entry, i) => {
      const searchableText = [
        entry.company,
        tr.entries[i]?.role ?? '',
        tr.entries[i]?.description ?? '',
        ...(tr.entries[i]?.highlights ?? []),
        ...entry.technologies,
      ].filter(Boolean).join(' ').toLowerCase();
      return searchableText.includes(search);
    });
  });

  protected readonly hasNoResults = computed(() =>
    this.searchService.searchTerm().trim().length > 0 && this.filteredEntries().length === 0
  );
}
