import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TeachersEffects } from './store/teachers.effects';
import { StoreModule } from '@ngrx/store';
import { teachersFeature } from './store/teachers.reducer';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';
import { TeacherDetailsComponent } from './pages/teacher-details/teacher-details.component';



@NgModule({
  declarations: [
    TeachersComponent,
    TeacherFormDialogComponent,
    TeacherDetailsComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule,
    StoreModule.forFeature(teachersFeature),
    EffectsModule.forFeature([TeachersEffects])
  ],
  exports: [
    TeachersComponent,
  ]
})
export class TeachersModule { }
