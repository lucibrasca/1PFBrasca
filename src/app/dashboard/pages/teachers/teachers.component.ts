import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeachersActions } from './store/teachers.actions';
import { Observable } from 'rxjs';
import { TeacherWithCourse } from './models';
import { selectTeachers} from './store/teachers.selectors';
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: []
})

export class TeachersComponent implements OnInit {

  teachers$: Observable<TeacherWithCourse[]>;

  isAdmin$ : Observable<boolean>;

  constructor(private matDialog: MatDialog,
            private store: Store){
      
    this.teachers$ = this.store.select(selectTeachers);
    this.isAdmin$=this.store.select(selectIsAdmin);
  }

  ngOnInit(): void {
    this.store.dispatch(TeachersActions.loadTeachers())
  }

  

  public displayedColumns = ['id','nombre','email','curso','acciones'];


onCreateTeacher(): void
{
  this.matDialog.open(TeacherFormDialogComponent);
}


onDeleteTeacher(teacher: number): void 
{
  this.store.dispatch(TeachersActions.deleteTeacher({ id: teacher}));
}
}
