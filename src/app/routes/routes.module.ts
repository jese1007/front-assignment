import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { Error403Component } from './sessions/403.component';
import { Error404Component } from './sessions/404.component';
import { Error500Component } from './sessions/500.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EtudiantDetailComponent } from './etudiant/etudiant-detail/etudiant-detail.component';
import { EtudiantEditComponent } from './etudiant/etudiant-edit/etudiant-edit.component';
import { EtudiantAddComponent } from './etudiant/etudiant-add/etudiant-add.component';
import { MatiereComponent } from './matiere/matiere.component';
import { MatiereDetailComponent } from './matiere/matiere-detail/matiere-detail.component';
import { MatiereEditComponent } from './matiere/matiere-edit/matiere-edit.component';
import { MatiereAddComponent } from './matiere/matiere-add/matiere-add.component';

const COMPONENTS: any[] = [
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  Error403Component,
  Error404Component,
  Error500Component,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    AssignmentsComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AssignmentDetailComponent,
    EtudiantComponent,
    EtudiantDetailComponent,
    EtudiantEditComponent,
    EtudiantAddComponent,
    MatiereComponent,
    MatiereDetailComponent,
    MatiereEditComponent,
    MatiereAddComponent,
  ],
})
export class RoutesModule {}
