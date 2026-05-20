import { Component, ChangeDetectionStrategy, inject, signal, computed, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarService } from '../../core/services/sidebar.service';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';
import { SearchService } from '../../core/services/search.service';
import type { Language } from '../../types/translation-keys';

interface Notification {
  icon: string;
  textKey: string;
  timeKey: string;
  unread: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class TopbarComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly themeService = inject(ThemeService);
  protected readonly searchService = inject(SearchService);
  private readonly translationService = inject(TranslationService);
  private readonly router = inject(Router);

  protected readonly userName = 'moonslayers';
  protected readonly userRole = 'admin';

  @ViewChildren('dropdownContainer', { read: ElementRef })
  protected dropdownContainers!: QueryList<ElementRef<HTMLElement>>;

  protected readonly t = this.translationService.t;
  protected readonly currentLang = this.translationService.currentLang;
  protected readonly searchOpen = signal(false);
  private readonly currentRoute = signal('');
  protected readonly currentPlaceholder = computed(() => {
    const key = this.placeholderKeyMap[this.currentRoute()] ?? 'topbar.search.placeholder.default';
    return this.translationService.t()[key];
  });
  protected readonly languageOpen = signal(false);
  protected readonly notificationsOpen = signal(false);

  protected readonly mockNotifications = signal<Notification[]>([
    {
      icon: 'bi-folder-plus',
      textKey: 'topbar.notifications.projectAdded',
      timeKey: 'topbar.notifications.time1',
      unread: true,
      colorClass: 'text-success',
    },
    {
      icon: 'bi-eye',
      textKey: 'topbar.notifications.profileViews',
      timeKey: 'topbar.notifications.time2',
      unread: true,
      colorClass: 'text-primary',
    },
    {
      icon: 'bi-code-slash',
      textKey: 'topbar.notifications.newSkill',
      timeKey: 'topbar.notifications.time3',
      unread: false,
      colorClass: 'text-info',
    },
  ]);

  protected readonly unreadCount = computed(() =>
    this.mockNotifications().filter(n => n.unread).length
  );

  private readonly placeholderKeyMap: Record<string, string> = {
    '/dashboard': 'topbar.search.placeholder.dashboard',
    '/dashboards/tiempo-produccion': 'topbar.search.placeholder.tiempoProduccion',
    '/dashboards/respuestas-promedio': 'topbar.search.placeholder.respuestasPromedio',
    '/profile': 'topbar.search.placeholder.profile',
    '/projects': 'topbar.search.placeholder.projects',
    '/career': 'topbar.search.placeholder.career',
    '/contact': 'topbar.search.placeholder.contact',
  };

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(event => {
      this.currentRoute.set(event.urlAfterRedirects);
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
    this.translationService.switchLanguage(lang as Language);
    this.languageOpen.set(false);
  }

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    const isInside = this.dropdownContainers?.toArray().some(
      ref => ref.nativeElement.contains(target)
    );
    if (!isInside) {
      this.searchOpen.set(false);
      this.notificationsOpen.set(false);
      this.languageOpen.set(false);
    }
  }
}
