import { Injectable, inject, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);

  private _isDark = signal<boolean>(false);
  readonly isDark = this._isDark.asReadonly();
  readonly isDark$ = toObservable(this._isDark);

  readonly theme = computed(() => this._isDark() ? 'dark' : 'light');
  readonly themeIcon = computed(() => this._isDark() ? 'bi-sun' : 'bi-moon');

  constructor() {
    this.initializeTheme();
  }

  toggleTheme(): void {
    this._isDark.update(v => !v);
    this.persistTheme();
    this.applyTheme();
  }

  setTheme(theme: 'dark' | 'light'): void {
    this._isDark.set(theme === 'dark');
    this.persistTheme();
    this.applyTheme();
  }

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem('portfolio-theme');

    if (storedTheme !== null) {
      this._isDark.set(storedTheme === 'dark');
    } else {
      this._isDark.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.listenToOsChanges();
    }

    this.applyTheme();
  }

  private listenToOsChanges(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('portfolio-theme') !== null) return;
      this._isDark.set(e.matches);
      this.applyTheme();
    };
    mediaQuery.addEventListener('change', handler);
  }

  private persistTheme(): void {
    localStorage.setItem('portfolio-theme', this.theme());
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute('data-bs-theme', this.theme());
  }
}
