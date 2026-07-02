import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UiColorTest } from './shared/ui-color-test/ui-color-test';
import { DashboardPage } from './pages/dashboard/dashboard-page';
import { TiempoProduccionPage } from './pages/tiempo-produccion/tiempo-produccion-page';
import { RespuestasPromedioPage } from './pages/respuestas-promedio/respuestas-promedio-page';
import { ProjectsPage } from './pages/projects/projects-page';
import { ProjectDetailPage } from './pages/projects/project-detail/project-detail';
import { ProfilePage } from './pages/profile/profile-page';
import { ContactPage } from './pages/contact/contact-page';
import { CareerPage } from './pages/career/career-page';

export const routes: Routes = [
  { path: '', redirectTo: 'ui-test', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'ui-test', component: UiColorTest },
      { path: 'dashboard', component: DashboardPage },
      { path: 'dashboards/tiempo-produccion', component: TiempoProduccionPage },
      { path: 'dashboards/respuestas-promedio', component: RespuestasPromedioPage },
      { path: 'profile', component: ProfilePage, data: { labelKey: 'sidebar.profile' } },
      { path: 'projects', component: ProjectsPage },
      { path: 'projects/:slug', component: ProjectDetailPage },
      { path: 'career', component: CareerPage, data: { labelKey: 'sidebar.career' } },
      { path: 'contact', component: ContactPage, data: { labelKey: 'sidebar.contacto' } },
    ],
  },
];
