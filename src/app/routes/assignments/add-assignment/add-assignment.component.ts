import { Component, OnInit, OnDestroy } from '@angular/core';
import { Assignment } from '@shared/model/assignments.model';
import { AssignmentsService } from '@shared/assignments.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatiereService } from '@shared/matiere.service';
import { EtudiantService } from '@shared/etudiant.service';
import { Etudiant } from 'app/model/etudiant.model';
import { Matiere } from 'app/model/matiere.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss'],
})
export class AddAssignmentComponent {
  // champs du formulaire
  matieres: Matiere[] = [];
  eleves: Etudiant[] = [];
  nomDevoir = '';
  dateDeRendu!: Date;
  auteur?: Etudiant | null;
  matiere?: Matiere | null;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private matiereService: MatiereService,
    private etudiantService: EtudiantService
  ) {}
  ngOnInit(): void {
    this.getSubjects();
    this.getEtudiants();
  }
  getSubjects() {
    this.matiereService.getMatieres().subscribe(data => {
      this.matieres = data;
    });
  }

  getEtudiants() {
    this.etudiantService.getEtudiants().subscribe(data => {
      this.eleves = data;
    });
  }
  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (this.nomDevoir === '') return;
    if (this.dateDeRendu === undefined) return;

    const nouvelAssignment = new Assignment();
    // génération d'id, plus tard ce sera fait dans la BD
    nouvelAssignment.name = this.nomDevoir || '';
    nouvelAssignment.dueDate = this.dateDeRendu;
    nouvelAssignment.student = this.auteur;
    nouvelAssignment.subject = this.matiere;
    nouvelAssignment.due = false;

    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(nouvelAssignment).subscribe(message => {
      console.log(message);

      // On va naviguer vers la page d'accueil pour afficher la liste
      // des assignments
      this.router.navigate(['/home']);
    });
  }
}
