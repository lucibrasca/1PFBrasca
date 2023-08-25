import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RegistrationActions } from './store/registration.actions';
import { RegistrationWithStudentAndCourse } from './models';
import { Observable } from 'rxjs';
import { selectRegistration } from './store/registration.selectors';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationFormDialogComponent } from './components/registration-form-dialog/registration-form-dialog.component';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})

export class RegistrationsComponent implements OnInit {

  public displayedColumns = ['id','alumno','curso', 'acciones'];

  public registration$: Observable<RegistrationWithStudentAndCourse[]>;

  public isAdmin$: Observable<boolean>;

  constructor(private store: Store, private matDialog: MatDialog){
    this.registration$ = this.store.select(selectRegistration);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }


  ngOnInit(): void {
   this.store.dispatch(RegistrationActions.loadRegistrations());
  }

  onAddRegistration(): void{
    this.matDialog.open(RegistrationFormDialogComponent);
  }

  onDeleteRegistration(registration: number): void{
  
    this.store.dispatch(RegistrationActions.deleteRegistration({ id: registration}));
  }
}
