import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsComponent } from './pages/user-details/user-details.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserFormDialogComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
