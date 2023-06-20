import { Component, OnInit } from '@angular/core';
import { Assignment } from '@shared/model/assignments.model';
import { AssignmentsService } from '@shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@core/authentication/';
import { MatiereService } from '@shared/matiere.service';
import { EtudiantService } from '@shared/etudiant.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss'],
})
export class AssignmentDetailComponent {
  assignmentTransmis?: Assignment;
  photoAuteur: any;
  note?: number = 0;
  add = false;
  user!: User;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private matiereService: MatiereService,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    const id = this.route.snapshot.params.id;
    this.authService.user().subscribe(user => (this.user = user));

    // on va chercher l'assignment à afficher
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      this.assignmentTransmis = assignment;
    });
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;

    // on demande au service la suppression de l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message);
      // Pour cacher le detail, on met l'assignment à null
      this.assignmentTransmis = undefined;

      // et on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.due = true;

    // on appelle le service pour faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message);
    });
  }

  onEditAssignment() {
    // navigation vers la page edit
    // équivalent à "/assignment/2/edit" par exemple
    // path = "/assignment/" + this.assignmentTransmis?.id + "/edit";
    // this.router.navigate([path]);
    // c'est pour vous montrer la syntaxe avec [...]
    this.router.navigate(['/assignments', this.assignmentTransmis?._id, 'edit'], {
      queryParams: {
        nom: this.assignmentTransmis?.name,
        matiere: 'Angular',
      },
      fragment: 'edition',
    });
  }

  addNote(){
    if(!isNaN(Number(this.note))){
      this.assignmentTransmis!.mark = this.note;
      this.assignmentTransmis!.due = true;
    }else{
      alert('c\'est pas un nombre');
    }
    this.assignmentsService
      .updateAssignment(this.assignmentTransmis as Assignment)
      .subscribe(message => {
        this.router.navigate(['/assignments/detail' + this.assignmentTransmis!._id]);
      });
  }

  isLogged() {
    // renvoie si on est loggé ou pas
    return this.authService.check;
  }
}
