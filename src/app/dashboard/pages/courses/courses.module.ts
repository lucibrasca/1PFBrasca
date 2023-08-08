import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
