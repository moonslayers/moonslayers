import { Component, ChangeDetectionStrategy, signal, inject, computed, afterNextRender } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarService } from '../../core/services/sidebar.service';
import { TranslationService } from '../../core/services/translation.service';

interface SidebarItemConfig {
  labelKey: string;
  icon: string;
  route?: string;
  children?: SidebarItemConfig[];
  section: string;
}

interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  children?: SidebarItem[];
  section: string;
}

interface SidebarSection {
  name: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sidebar-collapsed]': '!sidebarService.isOpen()'
  }
})
export class SidebarComponent {
  protected sidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  private readonly translationService = inject(TranslationService);
  protected readonly t = this.translationService.t;

  // Static user profile data
  protected readonly userName = 'moonslayers';
  protected readonly userRole = 'admin';

  private readonly menuConfig: SidebarItemConfig[] = [
    { labelKey: 'sidebar.dashboard', icon: 'bi-grid', route: '/dashboard', section: 'main' },
    {
      labelKey: 'sidebar.dashboards', icon: 'bi-bar-chart', section: 'main',
      children: [
        { labelKey: 'sidebar.tiempoProduccion', icon: 'bi-clock', route: '/dashboards/tiempo-produccion', section: 'main' },
        { labelKey: 'sidebar.respuestasPromedio', icon: 'bi-graph-up', route: '/dashboards/respuestas-promedio', section: 'main' },
      ]
    },
    { labelKey: 'sidebar.profile', icon: 'bi-person', route: '/profile', section: 'main' },
    { labelKey: 'sidebar.proyectos', icon: 'bi-folder', route: '/projects', section: 'career' },
    { labelKey: 'sidebar.career', icon: 'bi-calendar-event', route: '/career', section: 'career' },
    { labelKey: 'sidebar.contacto', icon: 'bi-envelope', route: '/contact', section: 'info' },
  ];

  protected readonly sections = computed<SidebarSection[]>(() => {
    const items = this.resolveItems(this.menuConfig);
    const sectionOrder: string[] = [];
    const sectionMap = new Map<string, SidebarItem[]>();

    for (const item of items) {
      if (!sectionMap.has(item.section)) {
        sectionMap.set(item.section, []);
        sectionOrder.push(item.section);
      }
      sectionMap.get(item.section)!.push(item);
    }

    return sectionOrder.map(name => ({
      name,
      items: sectionMap.get(name)!
    }));
  });

  private openSubMenus = signal<Set<string>>(new Set());

  private resolveItems(configs: SidebarItemConfig[]): SidebarItem[] {
    const t = this.translationService.t();
    return configs.map(c => ({
      label: t[c.labelKey],
      icon: c.icon,
      route: c.route,
      section: c.section,
      children: c.children ? this.resolveItems(c.children) : undefined,
    }));
  }

  protected toggleSubMenu(item: SidebarItem, depth: number): void {
    const key = `${depth}-${item.label}`;
    this.openSubMenus.update(set => {
      const next = new Set(set);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  protected isSubMenuOpen(item: SidebarItem, depth: number): boolean {
    return this.openSubMenus().has(`${depth}-${item.label}`);
  }

  protected getSectionTitle(sectionName: string): string {
    const key = `sidebar.section.${sectionName}`;
    const translation = this.t()[key];
    // If translation exists, use it; otherwise fallback to titlecase
    return translation ?? this.toTitleCase(sectionName);
  }

  protected toTitleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private autoOpenSubMenusForActiveRoute(): void {
    const currentSections = this.sections();
    this.openSubMenus.update(set => {
      const next = new Set(set);
      for (const section of currentSections) {
        this.markActiveInItems(section.items, 0, next);
      }
      return next;
    });
  }

  private markActiveInItems(items: SidebarItem[], depth: number, set: Set<string>): boolean {
    let hasActive = false;
    for (const item of items) {
      if (item.route && this.router.isActive(item.route, {
        paths: 'subset',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored'
      })) {
        hasActive = true;
      }
      if (item.children) {
        const childHasActive = this.markActiveInItems(item.children, depth + 1, set);
        if (childHasActive) {
          set.add(`${depth}-${item.label}`);
          hasActive = true;
        }
      }
    }
    return hasActive;
  }

  constructor() {
    afterNextRender(() => {
      this.autoOpenSubMenusForActiveRoute();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.autoOpenSubMenusForActiveRoute();
    });
  }

  protected logout(): void {
    // Placeholder: en una app real aquí se llamaría al auth service
    console.log('Logout clicked');
  }
}
