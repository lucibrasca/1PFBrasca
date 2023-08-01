import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'; 
import { FullNamePipe } from './pipes/full-name.pipe';
import { ControlErrorMessagePipe } from './pipes/control-error-message.pipe';
import { CabeceraDirective } from './directives/cabecera.directive'; 
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagePipe,
    CabeceraDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    FullNamePipe,
    ControlErrorMessagePipe,
    CabeceraDirective,
  ],
})
export class SharedModule { }
