import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarService } from '../../core/services/sidebar.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly themeService = inject(ThemeService);
  protected readonly searchOpen = signal(false);
  protected readonly currentPlaceholder = signal('Buscar en el portafolio...');
  protected readonly languageOpen = signal(false);
  protected readonly notificationsOpen = signal(false);
  protected readonly selectedLanguage = signal('ES');

  private readonly router = inject(Router);

  private readonly placeholderMap: Record<string, string> = {
    '/dashboard': 'Buscar métricas del dashboard...',
    '/dashboards/tiempo-produccion': 'Buscar tiempos de producción...',
    '/dashboards/respuestas-promedio': 'Buscar respuestas promedio...',
    '/profile': 'Buscar en mi perfil...',
    '/projects': 'Buscar proyectos...',
    '/career': 'Buscar experiencia...',
    '/contact': 'Buscar contacto...',
    '/ui-test': 'Buscando...',
  };

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(event => {
      this.currentPlaceholder.set(this.placeholderMap[event.urlAfterRedirects] ?? 'Buscar en el portafolio...');
    });
  }

  protected toggleSearch(): void {
    this.searchOpen.update(v => !v);
    if (this.notificationsOpen()) this.notificationsOpen.set(false);
    if (this.languageOpen()) this.languageOpen.set(false);
  }

  protected toggleLanguage(): void {
    this.languageOpen.update(v => !v);
    if (this.notificationsOpen()) this.notificationsOpen.set(false);
  }

  protected toggleNotifications(): void {
    this.notificationsOpen.update(v => !v);
    if (this.languageOpen()) this.languageOpen.set(false);
  }

  protected selectLanguage(lang: string): void {
    this.selectedLanguage.set(lang);
    this.languageOpen.set(false);
  }
}
