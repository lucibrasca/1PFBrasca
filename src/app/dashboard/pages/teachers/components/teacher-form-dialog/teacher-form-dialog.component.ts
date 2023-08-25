import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../courses/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TeachersActions } from '../../store/teachers.actions';
import { selectCourseOptions } from '../../store/teachers.selectors';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-teacher-form-dialog',
  templateUrl: './teacher-form-dialog.component.html',
  styleUrls: ['./teacher-form-dialog.component.scss']
})
export class TeacherFormDialogComponent implements OnInit{

  title : string='';

  nombreControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  apellidoControl  = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  emailControl = new FormControl<string|null>(null, [Validators.required, Validators.email]);
  cursoControl = new FormControl<number|null>(null, [Validators.required]);

  teacherForm= new FormGroup({
  
    nombre : this.nombreControl,
    apellido : this.apellidoControl,
    email : this.emailControl,
    courseId: this.cursoControl
    
  });

  courseOption$ : Observable<Course[]>;

  constructor(
    private dialogRef: MatDialogRef<TeacherFormDialogComponent>,
    private store: Store
  ) {
    
  this.courseOption$   = this.store.select(selectCourseOptions);
  }

  
  ngOnInit(): void {
    this.store.dispatch(TeachersActions.loadCourseOptions());
  }

  
  onSubmit(): void {

    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
    } else {
      this.store.dispatch(TeachersActions.createTeacher({ data: this.teacherForm.getRawValue() }));
      this.dialogRef.close(this.teacherForm.value);
    }
  }

}
