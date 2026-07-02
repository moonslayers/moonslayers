import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { CONTACT_DATA } from '../../data/contact.data';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  private readonly translationService = inject(TranslationService);
  protected readonly t = this.translationService.t;
  protected readonly contact = CONTACT_DATA;
  protected readonly contactTranslation = computed(
    () => this.contact.translations[this.translationService.currentLang()]
  );
}
