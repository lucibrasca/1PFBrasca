import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'; 
import { SharedModule } from '../shared/shared.module';
import { StudentsModule } from './pages/students/students.module';
import { Component } from '@angular/core';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule,
    StudentsModule,
    CdkMenu, 
    CdkMenuItem
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
