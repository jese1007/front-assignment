import { Component, OnInit } from '@angular/core';
import { Assignment } from '@shared/model/assignments.model';
import { AssignmentsService } from '@shared/assignments.service';
import { MatiereService } from '@shared/matiere.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { DateAdapter } from '@angular/material/core';
import { Matiere } from 'app/model/matiere.model';
import { EtudiantService } from '@shared/etudiant.service';
import { Etudiant } from 'app/model/etudiant.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss'],
})
export class EditAssignmentComponent {
  assignmentTransmis?: Assignment;
  matieres: Matiere[] = [];
  eleves: Etudiant[] = [];
  nomDevoir?: string = '';
  dateDeRendu?: Date;
  auteur?: Etudiant | null;
  matiere?: Matiere | null;

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService: MatiereService,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    const id = this.route.snapshot.params.id;
    console.log('Dans le ngOnInit de detail, id = ' ,this.dateDeRendu);

    // on va chercher l'assignment à afficher
    this.getSubjects();
    this.getEtudiants();
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      console.log('assignment ==>', assignment);
      this.nomDevoir = assignment?.name;
      this.dateDeRendu = assignment?.dueDate;
      this.auteur = assignment?.student;
      this.matiere = assignment?.subject;
      this.assignmentTransmis = assignment;
    });
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

  update() {
    if (this.nomDevoir === '') return;
    if (this.dateDeRendu === undefined) return;

    this.assignmentTransmis!.name = this.nomDevoir || '';
    this.assignmentTransmis!.dueDate = this.dateDeRendu;
    this.assignmentTransmis!.student = this.auteur;
    this.assignmentTransmis!.subject = this.matiere;

    // on demande au service d'ajouter l'assignment
    this.assignmentsService
      .updateAssignment(this.assignmentTransmis as Assignment)
      .subscribe(message => {
        this.router.navigate(['/assignments/detail' + this.assignmentTransmis!._id]);
      });
  }
}
