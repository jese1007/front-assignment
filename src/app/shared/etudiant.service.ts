import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  constructor() {}

  getEtudiants() {
    return [
      {
        id: 1,
        name: 'etudiant 1',
      },
      {
        id: 2,
        name: 'etudiant 1',
      },
      {
        id: 2,
        name: 'etudiant 1',
      },
    ];
  }
}
