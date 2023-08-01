import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeModule } from './dashboard/pages/home/home.module';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { StudentDetailComponent } from './dashboard/pages/students/pages/student-detail/student-detail.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { UsersComponent } from './dashboard/pages/users/users.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'students',
        children:[
          {
            path:'',
            component: StudentsComponent
          },
          {
            path: ':id',
            component: StudentDetailComponent
          },
        ]
      },
      {
        path:'courses',
        component: CoursesComponent
      },
      {
        path:'users',
        component: UsersComponent
      },
      {
        path:'**',
        redirectTo: 'home',
      }
    ],
  },
  {
    path:'auth',
    component: AuthComponent,
    children:[
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ]
  },
  {
    path:'**',
    redirectTo: '/auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
