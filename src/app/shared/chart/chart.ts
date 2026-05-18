import { Component, input, viewChild, ElementRef, effect, afterNextRender, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, ChartData, ChartOptions, registerables } from 'chart.js';
import { ThemeService } from '../../core/services/theme.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  template: `<div class="chart-container" [style.height]="height()">
    <canvas #canvas></canvas>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnDestroy {
  private themeService = inject(ThemeService);

  protected readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  type = input.required<ChartType>();
  data = input.required<ChartData>();
  options = input<ChartOptions>({});
  height = input<string>('250px');

  private chartInstance: Chart | null = null;

  constructor() {
    afterNextRender(() => {
      this.createChart();
    });

    effect(() => {
      void this.data();
      void this.options();
      void this.type();
      this.themeService.theme();

      if (this.chartInstance) {
        this.recreateChart();
      }
    });
  }

  private createChart(): void {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: this.type(),
      data: this.data(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: this.themeService.theme() === 'dark' ? '#e0e6ed' : '#212529',
            },
          },
        },
        scales: this.type() === 'line' ? {
          x: {
            ticks: { color: this.themeService.theme() === 'dark' ? '#e0e6ed' : '#212529' },
            grid: { color: this.themeService.theme() === 'dark' ? '#3a4755' : '#dee2e6' },
          },
          y: {
            ticks: { color: this.themeService.theme() === 'dark' ? '#e0e6ed' : '#212529' },
            grid: { color: this.themeService.theme() === 'dark' ? '#3a4755' : '#dee2e6' },
            beginAtZero: true,
          },
        } : this.type() === 'bar' ? {
          x: {
            ticks: { color: this.themeService.theme() === 'dark' ? '#e0e6ed' : '#212529' },
            grid: { color: this.themeService.theme() === 'dark' ? '#3a4755' : '#dee2e6' },
          },
          y: {
            ticks: { color: this.themeService.theme() === 'dark' ? '#e0e6ed' : '#212529' },
            grid: { color: this.themeService.theme() === 'dark' ? '#3a4755' : '#dee2e6' },
            beginAtZero: true,
          },
        } : undefined,
        ...this.options(),
      },
    };

    this.chartInstance = new Chart(ctx, config);
  }

  private recreateChart(): void {
    this.chartInstance?.destroy();
    this.chartInstance = null;
    this.createChart();
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
  }
}
