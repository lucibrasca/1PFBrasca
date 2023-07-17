import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { StudentTableComponent } from './components/student-table/student-table.component';





@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormDialogComponent,
    StudentTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StudentsComponent, 
  ],
})
export class StudentsModule { }
