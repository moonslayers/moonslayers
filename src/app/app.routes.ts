import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MeComponent } from './me/me.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'me', component: MeComponent },
    { path: 'projects', component: ProjectsComponent  },
];
