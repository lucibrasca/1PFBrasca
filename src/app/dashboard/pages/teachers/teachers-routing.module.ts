import { RouterModule } from "@angular/router";
import { TeachersComponent } from "./teachers.component";
import { NgModule } from "@angular/core";
import { TeacherDetailsComponent } from "./pages/teacher-details/teacher-details.component";

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild([
        {
            path:'',
            component: TeachersComponent
        },
        { 
          path:':id',
          component :TeacherDetailsComponent
        },

        ])
    ],
    exports:[RouterModule]
  })
  export class TeachersRoutingModule { }
  