import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent {

  nombreControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  apellidoControl  = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  emailControl = new FormControl<string|null>(null, [Validators.required, Validators.email]);
  contraseniaControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(8)]);
  telefonoControl = new FormControl<string|null>(null, [Validators.minLength(5)]);
  documentoControl = new FormControl<number|null>(null, [Validators.required, Validators.min(1000000)]);
  title : string='';
  
  studentForm= new FormGroup({
  
    nombre : this.nombreControl,
    apellido : this.apellidoControl,
    email : this.emailControl,
    contrasenia :this.contraseniaControl,
    telefono : this.telefonoControl,
    documento : this.documentoControl,
   
  });

  constructor(
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student
  ) {
      if (this.data) {
      this.title = "Editar Alumno";
      this.nombreControl.setValue(this.data.nombre);
      this.apellidoControl.setValue(this.data.apellido);
      this.emailControl.setValue(this.data.email);
      this.contraseniaControl.setValue(this.data.contrasenia);
      this.telefonoControl.setValue(this.data.telefono);
      this.documentoControl.setValue(this.data.documento);
    }
    else
    {
      this.title = "Alta Alumno";
    }
  }

  onSubmit(): void {

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }

}
