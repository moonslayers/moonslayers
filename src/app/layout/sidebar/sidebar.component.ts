import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { TranslationService } from '../../core/services/translation.service';

interface SidebarItemConfig {
  labelKey: string;
  icon: string;
  route?: string;
  children?: SidebarItemConfig[];
  section: 'main' | 'secondary';
}

interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  children?: SidebarItem[];
  section: 'main' | 'secondary';
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sidebar-collapsed]': '!sidebarService.isOpen()'
  }
})
export class SidebarComponent {
  protected sidebarService = inject(SidebarService);
  private readonly translationService = inject(TranslationService);
  protected readonly t = this.translationService.t;

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
    { labelKey: 'sidebar.proyectos', icon: 'bi-folder', route: '/projects', section: 'secondary' },
    { labelKey: 'sidebar.career', icon: 'bi-calendar-event', route: '/career', section: 'secondary' },
    { labelKey: 'sidebar.contacto', icon: 'bi-envelope', route: '/contact', section: 'secondary' },
  ];

  protected readonly mainMenuItems = computed<SidebarItem[]>(() =>
    this.resolveItems(this.menuConfig.filter(i => i.section === 'main'))
  );

  protected readonly secondaryMenuItems = computed<SidebarItem[]>(() =>
    this.resolveItems(this.menuConfig.filter(i => i.section === 'secondary'))
  );

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

  protected toggleSubMenu(item: SidebarItem): void {
    this.openSubMenus.update(set => {
      const next = new Set(set);
      if (next.has(item.label)) {
        next.delete(item.label);
      } else {
        next.add(item.label);
      }
      return next;
    });
  }

  protected isSubMenuOpen(item: SidebarItem): boolean {
    return this.openSubMenus().has(item.label);
  }
}
