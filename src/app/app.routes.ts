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
      { path: 'dashboard', component: PlaceholderPage, data: { label: 'Dashboard' } },
      { path: 'dashboards/tiempo-produccion', component: PlaceholderPage, data: { label: 'Tiempo en Producción' } },
      { path: 'dashboards/respuestas-promedio', component: PlaceholderPage, data: { label: 'Respuestas Promedio' } },
      { path: 'profile', component: PlaceholderPage, data: { label: 'Perfil' } },
      { path: 'projects', component: PlaceholderPage, data: { label: 'Proyectos' } },
      { path: 'career', component: PlaceholderPage, data: { label: 'Carrera' } },
      { path: 'contact', component: PlaceholderPage, data: { label: 'Contacto' } },
    ],
  },
];
