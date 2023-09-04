import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TeachersActions } from '../../store/teachers.actions';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-teacher-form-dialog',
  templateUrl: './teacher-form-dialog.component.html',
  styleUrls: ['./teacher-form-dialog.component.scss']
})
export class TeacherFormDialogComponent {

  title : string='';

  nombreControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  apellidoControl  = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  emailControl = new FormControl<string|null>(null, [Validators.required, Validators.email]);
 

  teacherForm= new FormGroup({
  
    nombre : this.nombreControl,
    apellido : this.apellidoControl,
    email : this.emailControl,
  
    
  });


  constructor(
    private dialogRef: MatDialogRef<TeacherFormDialogComponent>,
    private store: Store
  ) {

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
