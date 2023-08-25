import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { adminGuard } from "../core/guards/admin.guard";





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
                path: 'teachers',
                loadChildren: () => import('./pages/teachers/teachers.module').then((m) => m.TeachersModule)
            },
            {
                path:'courses',
                loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
            },
            {
                path:'registrations',
                loadChildren: () => import('./pages/registrations/registrations.module').then((m) => m.RegistrationsModule)
            },
            {
                path:'users',
                canActivate: [adminGuard],
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