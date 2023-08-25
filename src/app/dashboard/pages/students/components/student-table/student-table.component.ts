import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';


@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  displayedColumns: string[] = ['id', 'nombreCompleto', 'documento', 'email', 'acciones'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();
  
  @Output()
  editStudent = new EventEmitter<Student>();

  isAdmin$ : Observable<boolean>;

  constructor(private store: Store){
    this.isAdmin$=this.store.select(selectIsAdmin);
  }
  
}
