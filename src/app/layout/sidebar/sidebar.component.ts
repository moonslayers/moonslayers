import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';

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

  private openSubMenus = signal<Set<string>>(new Set());

  protected mainMenuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'bi-grid', route: '/dashboard', section: 'main' },
    {
      label: 'Dashboards',
      icon: 'bi-bar-chart',
      section: 'main',
      children: [
        { label: 'Tiempo en Producción', icon: 'bi-clock', route: '/dashboards/tiempo-produccion', section: 'main' },
        { label: 'Respuestas Promedio', icon: 'bi-graph-up', route: '/dashboards/respuestas-promedio', section: 'main' },
      ]
    },
    { label: 'Profile', icon: 'bi-person', route: '/profile', section: 'main' },
  ];

  protected secondaryMenuItems: SidebarItem[] = [
    { label: 'Proyectos', icon: 'bi-folder', route: '/projects', section: 'secondary' },
    { label: 'Career', icon: 'bi-calendar-event', route: '/career', section: 'secondary' },
    { label: 'Contacto', icon: 'bi-envelope', route: '/contact', section: 'secondary' },
  ];

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
