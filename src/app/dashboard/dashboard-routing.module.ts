import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";





@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
            },
            {
                path: 'students',
                loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule)
            },
            {
                path:'courses',
                loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
            },
            {
                path:'users',
                loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
            },
            {
                path:'**',
                redirectTo: 'home',
            }
        ])
],
exports :[RouterModule]
})
export class DashboardRoutingModule{}