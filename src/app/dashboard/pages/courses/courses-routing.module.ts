import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesDetailsComponent } from './pages/courses-details/courses-details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
       { 
        path:'',
        component :CoursesComponent
      },
      { 
        path:':id',
        component :CoursesDetailsComponent
      },
    ])
  ],
  exports:[RouterModule]
})
export class CoursesRoutingModule { }
