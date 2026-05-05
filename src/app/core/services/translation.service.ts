import { Injectable, inject, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { translations } from '../../translations';
import { type Language, LANG_STORAGE_KEY } from '../../types/translation-keys';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly document = inject(DOCUMENT);

  private readonly _currentLang = signal<Language>(this.loadInitialLang());
  readonly currentLang = this._currentLang.asReadonly();

  readonly t = computed(() => translations[this._currentLang()]);

  switchLanguage(lang: Language): void {
    this._currentLang.set(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    this.document.documentElement.lang = lang;
  }

  private loadInitialLang(): Language {
    const stored = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (stored === 'es' || stored === 'en') return stored;
    const browserLang = navigator.language?.startsWith('en') ? 'en' : 'es';
    return browserLang as Language;
  }
}
