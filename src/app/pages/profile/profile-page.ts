import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { SearchService } from '../../core/services/search.service';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly translationService = inject(TranslationService);
  private readonly searchService = inject(SearchService);
  protected readonly t = this.translationService.t;
  protected readonly profile = PROFILE_DATA;
  protected readonly profileTranslation = computed(() => this.profile.translations[this.translationService.currentLang()]);
  protected readonly techColors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'] as const;

  protected readonly isSearchActive = computed(() =>
    this.searchService.searchTerm().trim().length > 0
  );

  protected readonly filteredLanguages = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    if (!search) return this.profile.languages;
    return this.profile.languages.filter(lang => {
      const text = [lang.name, this.t()[lang.levelKey] ?? ''].join(' ').toLowerCase();
      return text.includes(search);
    });
  });

  protected readonly filteredEducation = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    if (!search) return this.profile.education;
    const tr = this.profileTranslation();
    return this.profile.education.filter((edu, i) => {
      const text = [edu.institution, tr.education[i]?.degree ?? '', tr.education[i]?.description ?? '']
        .join(' ').toLowerCase();
      return text.includes(search);
    });
  });

  protected readonly filteredSkills = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    if (!search) return this.profile.skills;
    return this.profile.skills.map(group => ({
      ...group,
      skills: group.skills.filter(skill => skill.toLowerCase().includes(search)),
    })).filter(group => group.skills.length > 0 || group.categoryKey.toLowerCase().includes(search));
  });

  protected readonly filteredCertifications = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    if (!search) return this.profile.certifications;
    const tr = this.profileTranslation();
    return this.profile.certifications.filter((cert, i) => {
      const text = [tr.certifications[i]?.name ?? '', cert.issuer ?? '', cert.date ?? '']
        .join(' ').toLowerCase();
      return text.includes(search);
    });
  });

  protected readonly filteredProjects = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    if (!search) return this.profile.experience;
    const tr = this.profileTranslation();
    return this.profile.experience.filter((exp, i) => {
      const text = [exp.company, ...exp.technologies, tr.experience[i]?.role ?? '']
        .join(' ').toLowerCase();
      return text.includes(search);
    });
  });
}
