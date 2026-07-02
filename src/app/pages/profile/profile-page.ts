import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
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
  protected readonly t = this.translationService.t;
  protected readonly profile = PROFILE_DATA;
  protected readonly profileTranslation = computed(() => this.profile.translations[this.translationService.currentLang()]);
  protected readonly techColors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'] as const;
}
