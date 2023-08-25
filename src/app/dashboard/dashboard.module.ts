import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'; 
import { SharedModule } from '../shared/shared.module';
import { StudentsModule } from './pages/students/students.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component'; 
import { CoursesModule } from './pages/courses/courses.module';
import { UsersModule } from './pages/users/users.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatButtonModule } from '@angular/material/button';

import { HomeModule } from './pages/home/home.module';
import { TeachersModule } from './pages/teachers/teachers.module';



@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule,
    HomeModule,
    StudentsModule,
    CoursesModule,
    UsersModule,
    MatListModule,
    TeachersModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }


