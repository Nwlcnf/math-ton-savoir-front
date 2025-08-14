import { Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth';
import { LoginComponent } from './component/auth/login/login';
import { SignupComponent } from './component/auth/signup/signup';
import { DashboardComponent } from './component/dashboard/dashboard';
import { LeconsListComponent } from './component/lecons-list/lecons-list';
import { LeconDetailComponent } from './component/lecon-detail/lecon-detail';
import { ExercicesListComponent } from './component/exercices-list/exercices-list';
import { ProfilComponent } from './component/profil/profil';
import { ExerciceDetailComponent } from './component/exercice-detail/exercice-detail';
import { AddLeconComponent } from './component/add-lecon/add-lecon';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
        ]
    },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lecons', component: LeconsListComponent },
  { path: 'lecon/:id', component: LeconDetailComponent },
  { path: 'exercices', component: ExercicesListComponent },
  { path: 'exercice/:id', component: ExerciceDetailComponent },
  { path: 'profil', component: ProfilComponent },
  { path : 'add-lecon', component : AddLeconComponent },
  { path: '**', redirectTo: '' }
];
