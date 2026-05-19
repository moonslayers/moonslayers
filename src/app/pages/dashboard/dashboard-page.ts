import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartComponent } from '../../shared/chart/chart';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';
import type { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, ChartComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly translationService = inject(TranslationService);
  private readonly themeService = inject(ThemeService);

  protected readonly t = this.translationService.t;

  // ============ Stat Cards ============
  protected readonly stats = [
    { icon: 'bi-calendar-check', value: '4+', labelKey: 'dashboard.stat.experience', color: 'text-primary', bgClass: 'bg-primary' },
    { icon: 'bi-folder', value: '8', labelKey: 'dashboard.stat.projects', color: 'text-success', bgClass: 'bg-success' },
    { icon: 'bi-code-slash', value: '15+', labelKey: 'dashboard.stat.technologies', color: 'text-info', bgClass: 'bg-info' },
    { icon: 'bi-award', value: '5', labelKey: 'dashboard.stat.certifications', color: 'text-warning', bgClass: 'bg-warning' },
  ];

  // ============ Reactive Chart Colors from Bootstrap CSS vars ============
  protected readonly chartPalette = computed(() => {
    // Create dependency on theme to reactively recompute
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

  // ============ Doughnut Chart: Skills by Category ============
  protected readonly skillsChartData = computed<ChartData<'doughnut'>>(() => {
    const colors = this.chartPalette();
    const t = this.t();
    return {
      labels: [
        t['dashboard.skill.frontend'],
        t['dashboard.skill.backend'],
        t['dashboard.skill.devops'],
        t['dashboard.skill.databases'],
        t['dashboard.skill.leadership'],
      ],
      datasets: [{
        data: [35, 30, 15, 10, 10],
        backgroundColor: [colors.success, colors.primary, colors.warning, colors.info, colors.danger],
        borderWidth: 0,
        hoverOffset: 8,
      }],
    };
  });

  protected readonly doughnutOptions: ChartOptions<'doughnut'> = {
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
        },
      },
    },
  };

  // ============ Bar Chart: Projects per Year ============
  protected readonly projectsChartData = computed<ChartData<'bar'>>(() => {
    const colors = this.chartPalette();
    return {
      labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
      datasets: [{
        data: [1, 1, 2, 2, 2, 1],
        backgroundColor: colors.primary,
        borderRadius: 6,
      }],
    };
  });

  protected readonly barOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: { display: false },
    },
  };

  // ============ Project Cards ============
  protected readonly projects = [
    {
      icon: 'bi-shop',
      titleKey: 'dashboard.project.floricultora',
      descKey: 'dashboard.project.floricultoraDesc',
      tech: ['Angular 19', 'Node.js', 'Express', 'C#', '.NET', 'SQLite', 'Docker'],
      color: 'text-primary',
    },
    {
      icon: 'bi-bank',
      titleKey: 'dashboard.project.credits',
      descKey: 'dashboard.project.creditsDesc',
      tech: ['Angular 21', 'Laravel 12', 'MySQL', 'GitHub Actions'],
      color: 'text-success',
    },
    {
      icon: 'bi-building-gear',
      titleKey: 'dashboard.project.sei',
      descKey: 'dashboard.project.seiDesc',
      tech: ['Angular 21', 'Laravel 12', 'MySQL', 'CI/CD', 'PHPUnit/Pest'],
      color: 'text-info',
    },
  ];

  // ============ Reference cards to other dashboards ============
  protected readonly refDashboards = [
    {
      icon: 'bi-clock-history',
      titleKey: 'dashboard.ref.productionTime',
      descKey: 'dashboard.ref.productionTimeDesc',
      route: '/dashboards/tiempo-produccion',
      color: 'text-primary',
      bgClass: 'bg-primary-subtle',
    },
    {
      icon: 'bi-graph-up-arrow',
      titleKey: 'dashboard.ref.avgResponses',
      descKey: 'dashboard.ref.avgResponsesDesc',
      route: '/dashboards/respuestas-promedio',
      color: 'text-success',
      bgClass: 'bg-success-subtle',
    },
  ];

  // ============ Certifications ============
  protected readonly certifications = [
    { icon: 'bi-cpu', title: 'Clasificación de Imágenes con Redes Neuronales', category: 'IA & Data Science' },
    { icon: 'bi-boxes', title: 'Machine Learning con Python', category: 'IA & Data Science' },
    { icon: 'bi-people', title: 'Gerencia Directiva para Prevención de Riesgos Psicosociales', category: 'Liderazgo' },
    { icon: 'bi-shield-check', title: 'FUND NOM-035 — Factores de Riesgo Psicosocial', category: 'Cumplimiento' },
    { icon: 'bi-graph-up-arrow', title: 'Liderazgo y Gerencia en Tecnología e Ingeniería', category: 'Liderazgo' },
  ];
}
