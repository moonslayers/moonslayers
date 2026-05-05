import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PlaceholderPage } from './pages/placeholder/placeholder-page';
import { UiColorTest } from './shared/ui-color-test/ui-color-test';

export const routes: Routes = [
  { path: '', redirectTo: 'ui-test', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'ui-test', component: UiColorTest },
      { path: 'dashboard', component: PlaceholderPage, data: { labelKey: 'sidebar.dashboard' } },
      { path: 'dashboards/tiempo-produccion', component: PlaceholderPage, data: { labelKey: 'sidebar.tiempoProduccion' } },
      { path: 'dashboards/respuestas-promedio', component: PlaceholderPage, data: { labelKey: 'sidebar.respuestasPromedio' } },
      { path: 'profile', component: PlaceholderPage, data: { labelKey: 'sidebar.profile' } },
      { path: 'projects', component: PlaceholderPage, data: { labelKey: 'sidebar.proyectos' } },
      { path: 'career', component: PlaceholderPage, data: { labelKey: 'sidebar.career' } },
      { path: 'contact', component: PlaceholderPage, data: { labelKey: 'sidebar.contacto' } },
    ],
  },
];
