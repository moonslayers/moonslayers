import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ChartComponent } from '../../shared/chart/chart';
import { SearchService } from '../../core/services/search.service';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';
import type { ChartData, ChartOptions } from 'chart.js';

interface TimelineProject {
  year: string;
  icon: string;
  color: string;
  titleKey: string;
  periodKey: string;
  roleKey: string;
  tech: string[];
  isActive?: boolean;
}

@Component({
  selector: 'app-tiempo-produccion-page',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './tiempo-produccion-page.html',
  styleUrl: './tiempo-produccion-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TiempoProduccionPage {
  private readonly translationService = inject(TranslationService);
  private readonly themeService = inject(ThemeService);
  private readonly searchService = inject(SearchService);

  protected readonly t = this.translationService.t;

  // ============ Stats ============
  protected readonly stats = [
    { icon: 'bi-folder-check', value: '8', labelKey: 'tiempoProduccion.stat.projects', color: 'text-primary', bgClass: 'bg-primary' },
    { icon: 'bi-calendar-range', value: '5', labelKey: 'tiempoProduccion.stat.yearsInProd', color: 'text-success', bgClass: 'bg-success' },
    { icon: 'bi-stack', value: '15+', labelKey: 'tiempoProduccion.stat.technologies', color: 'text-info', bgClass: 'bg-info' },
    { icon: 'bi-people', value: '5', labelKey: 'tiempoProduccion.stat.clients', color: 'text-warning', bgClass: 'bg-warning' },
  ];

  // ============ Timeline data ============
  protected readonly timelineProjects: TimelineProject[] = [
    { year: '2021', icon: 'bi-newspaper', color: 'text-secondary', titleKey: 'tiempoProduccion.project.covid', periodKey: 'tiempoProduccion.period.6months', roleKey: 'tiempoProduccion.role.intern', tech: [] },
    { year: '2022', icon: 'bi-heart-pulse', color: 'text-secondary', titleKey: 'tiempoProduccion.project.psicologica', periodKey: 'tiempoProduccion.period.6months', roleKey: 'tiempoProduccion.role.intern', tech: [] },
    { year: '2023', icon: 'bi-shop', color: 'text-primary', titleKey: 'tiempoProduccion.project.floricultora', periodKey: 'tiempoProduccion.period.1year', roleKey: 'tiempoProduccion.role.fullstack', tech: ['Angular 19', 'Node.js', 'Express', 'C#', '.NET', 'SQLite', 'Docker'] },
    { year: '2023', icon: 'bi-boxes', color: 'text-success', titleKey: 'tiempoProduccion.project.almacenes', periodKey: 'tiempoProduccion.period.1year', roleKey: 'tiempoProduccion.role.frontend', tech: ['Angular 18', 'Laravel 10', 'MySQL 8.0', 'Docker'] },
    { year: '2024', icon: 'bi-bank', color: 'text-primary', titleKey: 'tiempoProduccion.project.creditos', periodKey: 'tiempoProduccion.period.ongoing', roleKey: 'tiempoProduccion.role.leader', tech: ['Angular 21', 'Laravel 12', 'MySQL 8.0', 'AWS', 'Docker'], isActive: true },
    { year: '2024', icon: 'bi-building-gear', color: 'text-info', titleKey: 'tiempoProduccion.project.sei', periodKey: 'tiempoProduccion.period.1year', roleKey: 'tiempoProduccion.role.leader', tech: ['Angular 21', 'Laravel 12', 'MySQL', 'CI/CD', 'PHPUnit/Pest'] },
    { year: '2025', icon: 'bi-receipt', color: 'text-warning', titleKey: 'tiempoProduccion.project.estimulos', periodKey: 'tiempoProduccion.period.ongoing', roleKey: 'tiempoProduccion.role.leader', tech: ['Angular 21', 'Laravel 12', 'MySQL', 'CI/CD'] },
    { year: '2025', icon: 'bi-globe', color: 'text-success', titleKey: 'tiempoProduccion.project.landing', periodKey: 'tiempoProduccion.period.6months', roleKey: 'tiempoProduccion.role.freelance', tech: ['Astro', 'Tailwind CSS'] },
  ];

  // ============ Group projects by year for timeline (filtered by search) ============
  protected readonly timelineYearGroups = computed(() => {
    const search = this.searchService.searchTerm().toLowerCase().trim();
    const t = this.t();
    const groups: { year: string; items: TimelineProject[] }[] = [];
    const seenYears = new Map<string, TimelineProject[]>();

    for (const project of this.timelineProjects) {
      // Apply search filter
      if (search) {
        const text = [
          t[project.titleKey],
          t[project.roleKey],
          ...project.tech,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!text.includes(search)) continue;
      }

      if (!seenYears.has(project.year)) {
        seenYears.set(project.year, []);
      }
      seenYears.get(project.year)!.push(project);
    }

    for (const [year, items] of seenYears) {
      groups.push({ year, items });
    }

    return groups;
  });

  // ============ Reactive Chart Colors ============
  protected readonly chartPalette = computed(() => {
    this.themeService.theme();
    const style = getComputedStyle(document.documentElement);
    return {
      primary: style.getPropertyValue('--bs-primary').trim(),
      success: style.getPropertyValue('--bs-success').trim(),
      info: style.getPropertyValue('--bs-info').trim(),
      warning: style.getPropertyValue('--bs-warning').trim(),
      danger: style.getPropertyValue('--bs-danger').trim(),
    };
  });

  // ============ Tech Frequency Chart (horizontal bar) ============
  protected readonly techFrequencyData = computed<ChartData<'bar'>>(() => {
    const colors = this.chartPalette();
    const t = this.t();

    // Count technologies across all projects
    const techCount: Record<string, number> = {};
    for (const project of this.timelineProjects) {
      for (const tech of project.tech) {
        techCount[tech] = (techCount[tech] || 0) + 1;
      }
    }

    // Sort by frequency descending, take top 8
    const sorted = Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    return {
      labels: sorted.map(([tech]) => tech),
      datasets: [{
        label: t['tiempoProduccion.chart.projectsLabel'],
        data: sorted.map(([, count]) => count),
        backgroundColor: colors.primary,
        borderRadius: 4,
      }],
    };
  });

  protected readonly techChartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
}
