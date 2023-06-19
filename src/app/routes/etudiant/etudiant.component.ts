import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Etudiant } from 'app/model/etudiant.model';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss'],
})
export class EtudiantComponent {
  etudiant: Etudiant[] = [];
  columns: MtxGridColumn[] = [
    {
      header: 'Id',
      field: 'Id',
      formatter: (data: any) =>
        `<a href="/etudiant/detail/${data.id}" target="_blank">${data.id}</a>`,
    },
    { header: 'Nom', field: 'name' },
  ];
}
