import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormDialogComponent,
    StudentTableComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    StudentsComponent, 
  ],
})
export class StudentsModule { }
