import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '@core';
import { Etudiant } from 'app/model/etudiant.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  etudiant: Etudiant[] = [];
  constructor(private loggingService: LoginService, private http: HttpClient) {}
  uri_api = UrlService.uri_api + 'students';

  getEtudiants(): Observable<any> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable
    return this.http.get<Etudiant[]>(this.uri_api );

    // of() permet de créer un Observable qui va
    // contenir les données du tableau Etudiants
    //return of(this.Etudiants);
  }

  getEtudiant(id: number): Observable<Etudiant | undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http
      .get<Etudiant | undefined>(`${this.uri_api}/${id}`)

      .pipe(
        map(a => {
          return a;
        }),
        catchError(
          this.handleError<Etudiant>('Erreur dans le traitement de Etudiant avec id = ' + id)
        )
      );

  }

  addEtudiant(etudiant: Etudiant): Observable<any> {
    this.loggingService.log(etudiant.name, 'ajouté');

    // plus tard on utilisera un web service pour l'ajout dans une vraie BD
    return this.http.post<Etudiant>(this.uri_api, etudiant);
    // on ajoute le devoir au tableau des devoirs
    //this.Etudiants.push(Etudiant);
    // on retourne un message de succès à travers
    // un Observable
    //return of(`Etudiant ${Etudiant.nom} ajouté avec succès`);
  }

  updateEtudiant(etudiant: Etudiant): Observable<any> {
    // Normalement : on appelle un web service pour l'update des
    // données
    return this.http.put<Etudiant>(this.uri_api, etudiant);

  }

  deleteEtudiant(etudiant: Etudiant): Observable<any> {
    return this.http.delete(this.uri_api + '/' + etudiant._id);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
