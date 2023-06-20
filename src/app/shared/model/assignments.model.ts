import { Etudiant } from 'app/model/etudiant.model';
import { Matiere } from 'app/model/matiere.model';

export class Assignment {
  _id!: string;
  name!: string;
  dueDate!: Date;
  due!: boolean;
  student?: Etudiant | null;
  subject?: Matiere | null;
  mark?: number | null;
}
