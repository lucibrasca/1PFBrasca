import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss']
})
export class CourseFormDialogComponent {

  nombreControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  fechaInicioControl  = new FormControl<Date|null>(null, [Validators.required]);
  fechaFinControl = new FormControl<Date|null>(null, [Validators.required]);

  title : string='';
  
  courseForm= new FormGroup({
  
    nombre : this.nombreControl,
    fechaInicio : this.fechaInicioControl,
    fechaFin : this.fechaFinControl,
   
  });

  constructor(
    private dialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course
  ) {
      if (this.data) {
      this.title = "Editar Curso";
      this.nombreControl.setValue(this.data.nombre);
      this.fechaInicioControl.setValue(this.data.fechaInicio);
      this.fechaFinControl.setValue(this.data.fechaFin);
      console.log(this.fechaFinControl.value);
    }
    else
    {
      this.title = "Alta Curso";
    }
  }


  onSubmit(): void {

    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }

}
