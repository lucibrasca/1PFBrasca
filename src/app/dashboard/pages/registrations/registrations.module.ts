import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationsComponent } from './registrations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationsRoutingModule } from './registrations-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { RegistrationEffects } from './store/registration.effects';
import { StoreModule } from '@ngrx/store';
import { registrationFeature } from './store/registration.reducer';
import { RegistrationFormDialogComponent } from './components/registration-form-dialog/registration-form-dialog.component';



@NgModule({
  declarations: [
    RegistrationsComponent,
    RegistrationFormDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationsRoutingModule,
    StoreModule.forFeature(registrationFeature),
    EffectsModule.forFeature([RegistrationEffects])
  ]
})
export class RegistrationsModule { }
