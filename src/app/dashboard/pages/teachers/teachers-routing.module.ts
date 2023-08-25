import { RouterModule } from "@angular/router";
import { TeachersComponent } from "./teachers.component";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild([
        {
            path:'',
            component: TeachersComponent
        },

        ])
    ],
    exports:[RouterModule]
  })
  export class TeachersRoutingModule { }
  