import { Injectable } from '@angular/core';
import { Assignment } from './model/assignments.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoginService } from '@core/authentication/login.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  // tableau de devoirs à rendre
  assignments: Assignment[] = [];
  constructor(private loggingService: LoginService, private http: HttpClient) {}

  uri_api = UrlService.uri_api + 'assignements';

  getAssignments(page: number, limit: number, match: boolean): Observable<any> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable
    return this.http.get<Assignment[]>(
      this.uri_api + '?page=' + page + '&limit=' + limit + '&match=' + match
    );

    // of() permet de créer un Observable qui va
    // contenir les données du tableau assignments
    //return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http
      .get<Assignment | undefined>(`${this.uri_api}/${id}`)

      .pipe(
        map(a => {
          return a;
        }),
        catchError(
          this.handleError<Assignment>('Erreur dans le traitement de assignment avec id = ' + id)
        )
      );

    // On va chercher dans le tableau des assignments
    // l'assignment dont l'id est celui passé en paramètre

    //const assignment = this.assignments.find(a => a.id === id);
    // on retourne cet assignment encapsulé dans un Observable
    //return of(assignment);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.name, 'ajouté');

    // plus tard on utilisera un web service pour l'ajout dans une vraie BD
    return this.http.post<Assignment>(this.uri_api, assignment);
    // on ajoute le devoir au tableau des devoirs
    //this.assignments.push(assignment);
    // on retourne un message de succès à travers
    // un Observable
    //return of(`Assignment ${assignment.nom} ajouté avec succès`);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // Normalement : on appelle un web service pour l'update des
    // données
    return this.http.put<Assignment>(this.uri_api+ '/' + assignment._id, assignment);

    // dans la version tableau : rien à faire (pourquoi ? Parceque assignment
    // est déjà un élément du tableau this.assignments)

    //this.loggingService.log(assignment.nom, 'modifié');

    //return of(`Assignment ${assignment.nom} modifié avec succès`)
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(this.uri_api + '/' + assignment._id);
    // pour supprimer on passe à la méthode splice
    // l'index de l'assignment à supprimer et
    // le nombre d'éléments à supprimer (ici 1)
    /*
    const index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1);

    this.loggingService.log(assignment.nom, 'supprimé');

    return of('Assignment supprimé avec succès')
    */
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      const newAssignment = new Assignment();
      newAssignment.name = a.name;
      newAssignment.dueDate = new Date(a.dueDate);
      newAssignment.due = a.due;

      this.addAssignment(newAssignment).subscribe(reponse => {
        console.log(reponse.message);
      });
    });
  }

  // cette version retourne un Observable. Elle permet de savoir quand
  // l'opération est terminée (l'ajout des 1000 assignments)
  peuplerBDavecForkJoin(): Observable<any> {
    // tableau d'observables (les valeurs de retour de addAssignment)
    const appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.name = a.name;
      nouvelAssignment.dueDate = new Date(a.dueDate);
      nouvelAssignment.due = a.due;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }
}
