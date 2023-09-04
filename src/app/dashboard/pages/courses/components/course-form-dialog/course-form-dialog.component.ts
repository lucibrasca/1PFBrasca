import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Teacher } from '../../../teachers/models';
import { Store } from '@ngrx/store';
import { CourseWithTeacher } from '../../models';
import { selectTeacherOptions } from '../../store/course.selectors';
import { CourseActions } from '../../store/course.actions';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss']
})
export class CourseFormDialogComponent  implements OnInit{

  nombreControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  fechaInicioControl  = new FormControl<Date|null>(null, [Validators.required]);
  fechaFinControl = new FormControl<Date|null>(null, [Validators.required]);
  teacherControl = new FormControl<number|null>(null, [Validators.required]);

  title : string='';
  
  courseForm= new FormGroup({
  
    nombre : this.nombreControl,
    fechaInicio : this.fechaInicioControl,
    fechaFin : this.fechaFinControl,
    teacherId: this.teacherControl
  });

   teacherOption$ : Observable<Teacher[]>;

  constructor(
    private dialogRef: MatDialogRef<CourseFormDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data?: CourseWithTeacher
  ) {
      if (this.data) {
      this.title = "Editar Curso";
      this.nombreControl.setValue(this.data.nombre);
      this.fechaInicioControl.setValue(this.data.fechaInicio);
      this.fechaFinControl.setValue(this.data.fechaFin);
      this.teacherControl.setValue(this.data.teacherId);
    }
    else
    {
      this.title = "Alta Curso";
    }

    this.teacherOption$   = this.store.select(selectTeacherOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadTeacherOptions());
  }


  onSubmit(): void {

    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }

}
