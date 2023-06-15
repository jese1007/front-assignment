import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Assignment } from '@shared/model/assignments.model';
import { AssignmentsService } from '@shared/assignments.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
})
export class AssignmentsComponent {
  assignments: Assignment[] = [];
  columns: MtxGridColumn[] = [
    {
      header: 'Id',
      field: 'Id',
      formatter: (data: any) => `<a href="/assignments/detail/${data.id}" target="_blank">${data.id}</a>`,
    },
    { header: 'Nom', field: 'nom' },
    { header: 'DateDeRendu', field: 'dateDeRendu' },
    {
      header: 'Rendu',
      field: 'rendu',
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'red-100' },
        false: { text: 'No', color: 'green-100' },
      },
    },
  ];
  list: any[] = [];
  total = 0;
  isLoading = true;

  page=1;
  limit=10;
  totalDocs = 0;
  totalPages = 0;
  hasPrevPage = false;
  prevPage = 0;
  hasNextPage = false;
  nextPage = 0;

  notifySubscription!: Subscription;

  query = {
    q: 'user:nzbin',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 10,
  };

  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }
  constructor(private assignmentsService: AssignmentsService, private ngZone: NgZone) {}

  ngOnInit(): void {
    console.log(
      'OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)'
    );
    // exercice : regarder si il existe des query params
    // page et limit, récupérer leur valeurs si elles existent
    // et les passer à la méthode getAssignments
    // TODO
    this.getAssignments();
  }

  getAssignments() {
    console.log('On va chercher les assignments dans le service');

    this.assignmentsService.getAssignments(this.page, this.limit).subscribe(data => {
      this.list = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.total = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      this.isLoading = false;
      console.log('Données reçues');
    });
  }


  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.per_page = e.pageSize;
    this.getAssignments();
  }

  search() {
    this.query.page = 0;
    this.getAssignments();
  }

  reset() {
    this.query.page = 0;
    this.query.per_page = 10;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);

    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignments();
  }
}
