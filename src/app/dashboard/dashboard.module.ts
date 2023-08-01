import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'; 
import { SharedModule } from '../shared/shared.module';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component'; 



@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule,
    CdkMenu, 
    CdkMenuItem,
    RouterModule,
    MatListModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
