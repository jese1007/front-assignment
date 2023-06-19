import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { Error403Component } from './sessions/403.component';
import { Error404Component } from './sessions/404.component';
import { Error500Component } from './sessions/500.component';
import { authGuard } from '@core/authentication';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EtudiantDetailComponent } from './etudiant/etudiant-detail/etudiant-detail.component';
import { EtudiantEditComponent } from './etudiant/etudiant-edit/etudiant-edit.component';
import { EtudiantAddComponent } from './etudiant/etudiant-add/etudiant-add.component';
import { MatiereComponent } from './matiere/matiere.component';
import { MatiereDetailComponent } from './matiere/matiere-detail/matiere-detail.component';
import { MatiereEditComponent } from './matiere/matiere-edit/matiere-edit.component';
import { MatiereAddComponent } from './matiere/matiere-add/matiere-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'assignments', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'assignments/add', component: AddAssignmentComponent },
      { path: 'assignments/detail/:id', component: AssignmentDetailComponent },
      { path: 'assignments/edit/:id', component: EditAssignmentComponent },
      { path: 'etudiant', component: EtudiantComponent },
      { path: 'etudiant/add', component: EtudiantAddComponent },
      { path: 'etudiant/detail/:id', component: EtudiantDetailComponent },
      { path: 'etudiant/edit/:id', component: EtudiantEditComponent },
      { path: 'matiere', component: MatiereComponent },
      { path: 'matiere/add', component: MatiereAddComponent },
      { path: 'matiere/detail/:id', component: MatiereDetailComponent },
      { path: 'matiere/edit/:id', component: MatiereEditComponent },
      {
        path: 'design',
        loadChildren: () => import('./design/design.module').then(m => m.DesignModule),
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
      },
      {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('./permissions/permissions.module').then(m => m.PermissionsModule),
      },
      {
        path: 'utilities',
        loadChildren: () => import('./utilities/utilities.module').then(m => m.UtilitiesModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'assignments' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
