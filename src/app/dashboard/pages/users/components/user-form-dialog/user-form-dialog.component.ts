import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {

  nombreControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  apellidoControl  = new FormControl<string|null>(null, [Validators.required, Validators.minLength(2)]);
  emailControl = new FormControl<string|null>(null, [Validators.required, Validators.email]);
  contraseniaControl = new FormControl<string|null>(null, [Validators.required, Validators.minLength(8)]);
  rolControl = new FormControl<string|null>(null, [Validators.required]);
  tokenControl = new FormControl<string|null>(null);
  
  title : string='';
  
  userForm= new FormGroup({
  
    nombre : this.nombreControl,
    apellido : this.apellidoControl,
    email : this.emailControl,
    contrasenia :this.contraseniaControl,
    rol : this.rolControl,
    token : this.tokenControl
  
  });

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
      if (this.data) {
      this.title = "Editar Usuario";
      this.nombreControl.setValue(this.data.nombre);
      this.apellidoControl.setValue(this.data.apellido);
      this.emailControl.setValue(this.data.email);
      this.contraseniaControl.setValue(this.data.contrasenia);
      this.rolControl.setValue(this.data.rol);
      this.tokenControl.setValue(this.data.token);
  
    }
    else
    {
      this.title = "Alta Usuario";
    }
  }

  onSubmit(): void {

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }

}
