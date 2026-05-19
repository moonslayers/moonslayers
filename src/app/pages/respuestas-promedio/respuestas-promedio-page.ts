import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ChartComponent } from '../../shared/chart/chart';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';
import type { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-respuestas-promedio-page',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './respuestas-promedio-page.html',
  styleUrl: './respuestas-promedio-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RespuestasPromedioPage {
  private readonly translationService = inject(TranslationService);
  private readonly themeService = inject(ThemeService);

  protected readonly t = this.translationService.t;

  // ============ KPI Stats ============
  protected readonly stats = [
    { icon: 'bi-trophy', value: '1,148', labelKey: 'respuestasPromedio.kpi.storyPoints', descKey: 'respuestasPromedio.kpi.storyPointsDesc', color: 'text-primary', bgClass: 'bg-primary' },
    { icon: 'bi-check-circle', value: '559', labelKey: 'respuestasPromedio.kpi.tickets', descKey: 'respuestasPromedio.kpi.ticketsDesc', color: 'text-success', bgClass: 'bg-success' },
    { icon: 'bi-person-check', value: '367', labelKey: 'respuestasPromedio.kpi.myTickets', descKey: 'respuestasPromedio.kpi.myTicketsDesc', color: 'text-info', bgClass: 'bg-info' },
    { icon: 'bi-eye', value: '90%', labelKey: 'respuestasPromedio.kpi.prReview', descKey: 'respuestasPromedio.kpi.prReviewDesc', color: 'text-warning', bgClass: 'bg-warning' },
  ];

  // ============ Reactive Chart Colors from CSS vars ============
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

  // ============ Response Time Trend (mini line chart for hero) ============
  protected readonly responseTrendData = computed<ChartData<'line'>>(() => {
    const colors = this.chartPalette();
    return {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        data: [7, 7, 6, 8, 7, 6, 7, 7, 6, 8, 7, 7],
        borderColor: colors.primary,
        backgroundColor: colors.primary + '1A',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: colors.primary,
      }],
    };
  });

  protected readonly responseTrendOptions: ChartOptions<'line'> = {
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false, min: 0, max: 10 },
    },
    elements: { point: { radius: 0 } },
    maintainAspectRatio: false,
  };

  // ============ Monthly Resolution Bar Chart ============
  protected readonly resolutionData = computed<ChartData<'bar'>>(() => {
    const colors = this.chartPalette();
    const t = this.t();
    return {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: t['respuestasPromedio.chart.resolutionLabel'],
        data: [46, 47, 42, 53, 47, 44, 47, 50, 44, 52, 44, 43],
        backgroundColor: colors.primary,
        borderRadius: 6,
      }],
    };
  });

  protected readonly resolutionOptions: ChartOptions<'bar'> = {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 10 } },
    },
  };

  // ============ Workload Distribution (stacked bar) ============
  protected readonly distributionData = computed<ChartData<'bar'>>(() => {
    const colors = this.chartPalette();
    const t = this.t();
    return {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: t['respuestasPromedio.chart.myTicketsLabel'],
          data: [30, 32, 28, 35, 30, 28, 32, 34, 30, 32, 28, 28],
          backgroundColor: colors.primary,
          borderRadius: 4,
        },
        {
          label: t['respuestasPromedio.chart.teamTicketsLabel'],
          data: [16, 15, 14, 18, 17, 16, 15, 16, 14, 20, 16, 15],
          backgroundColor: colors.info,
          borderRadius: 4,
        },
      ],
    };
  });

  protected readonly distributionOptions: ChartOptions<'bar'> = {
    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } } },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  // ============ Code Review Donut Chart ============
  protected readonly reviewData = computed<ChartData<'doughnut'>>(() => {
    const colors = this.chartPalette();
    const t = this.t();
    return {
      labels: [t['respuestasPromedio.chart.reviewedLabel'], t['respuestasPromedio.chart.notReviewedLabel']],
      datasets: [{
        data: [90, 10],
        backgroundColor: [colors.success, colors.danger],
        borderWidth: 0,
        hoverOffset: 8,
      }],
    };
  });

  protected readonly reviewOptions: ChartOptions<'doughnut'> = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16, usePointStyle: true },
      },
    },
  };

  // ============ Radar Chart: Tech Leadership ============
  protected readonly radarLabels = [
    'respuestasPromedio.radar.codeQuality',
    'respuestasPromedio.radar.teamLeadership',
    'respuestasPromedio.radar.delivery',
    'respuestasPromedio.radar.architecture',
    'respuestasPromedio.radar.devops',
  ] as const;

  protected readonly radarScores = [90, 85, 88, 82, 80];

  protected readonly radarData = computed<ChartData<'radar'>>(() => {
    const colors = this.chartPalette();
    const t = this.t();
    return {
      labels: this.radarLabels.map(l => t[l]),
      datasets: [{
        label: '',
        data: this.radarScores,
        backgroundColor: colors.primary + '33',
        borderColor: colors.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.primary,
        pointRadius: 4,
      }],
    };
  });

  protected readonly radarOptions: ChartOptions<'radar'> = {
    plugins: { legend: { display: false } },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, backdropColor: 'transparent' },
      },
    },
  };

  // ============ Tech Stack Doughnut ============
  protected readonly techStackData = computed<ChartData<'doughnut'>>(() => {
    const colors = this.chartPalette();
    const t = this.t();
    return {
      labels: [
        t['respuestasPromedio.tech.frontend'],
        t['respuestasPromedio.tech.backend'],
        t['respuestasPromedio.tech.devops'],
        t['respuestasPromedio.tech.databases'],
      ],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: [colors.success, colors.primary, colors.warning, colors.info],
        borderWidth: 0,
        hoverOffset: 8,
      }],
    };
  });

  protected readonly techStackOptions: ChartOptions<'doughnut'> = {
    cutout: '55%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16, usePointStyle: true },
      },
    },
  };
}
