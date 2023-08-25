import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesDetailsComponent } from './pages/courses-details/courses-details.component';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { courseFeature } from './store/course.reducer';
import { StoreModule } from '@ngrx/store';
import { teachersFeature } from '../teachers/store/teachers.reducer';
import { TeachersEffects } from '../teachers/store/teachers.effects';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormDialogComponent,
    CoursesDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
    StoreModule.forFeature(courseFeature),
    StoreModule.forFeature(teachersFeature),
    EffectsModule.forFeature([CourseEffects, TeachersEffects])
  ]
})
export class CoursesModule { }
