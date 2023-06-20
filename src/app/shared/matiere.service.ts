import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from 'app/model/matiere.model';
import { UrlService } from './url.service';
import { LoginService } from '@core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  matiere: Matiere[] = [];
  constructor(private loggingService: LoginService, private http: HttpClient) {}
  uri_api = UrlService.uri_api + 'subjects';

  getMatieres(): Observable<any> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable
    return this.http.get<Matiere[]>(this.uri_api );

    // of() permet de créer un Observable qui va
    // contenir les données du tableau Matieres
    //return of(this.Matieres);
  }

  getMatier(id: number): Observable<Matiere | undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http
      .get<Matiere | undefined>(`${this.uri_api}/${id}`)

      .pipe(
        map(a => {
          return a;
        }),
        catchError(
          this.handleError<Matiere>('Erreur dans le traitement de Matiere avec id = ' + id)
        )
      );

  }

  addMatiere(matiere: Matiere): Observable<any> {
    this.loggingService.log(matiere.label, 'ajouté');

    // plus tard on utilisera un web service pour l'ajout dans une vraie BD
    return this.http.post<Matiere>(this.uri_api, matiere);
    // on ajoute le devoir au tableau des devoirs
    //this.Matieres.push(Matiere);
    // on retourne un message de succès à travers
    // un Observable
    //return of(`Matiere ${Matiere.nom} ajouté avec succès`);
  }

  updateMatiere(matiere: Matiere): Observable<any> {
    // Normalement : on appelle un web service pour l'update des
    // données
    return this.http.put<Matiere>(this.uri_api, matiere);

  }

  deleteMatiere(matiere: Matiere): Observable<any> {
    return this.http.delete(this.uri_api + '/' + matiere._id);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

}
