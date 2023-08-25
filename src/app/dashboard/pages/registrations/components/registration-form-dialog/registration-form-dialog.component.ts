import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegistrationActions } from '../../store/registration.actions';
import { Student } from '../../../students/models';
import { selectCourseOptions, selectStudentOptions } from '../../store/registration.selectors';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-form-dialog',
  templateUrl: './registration-form-dialog.component.html',
  styleUrls: ['./registration-form-dialog.component.scss']
})
export class RegistrationFormDialogComponent implements OnInit {
 
  studentControl = new FormControl<number|null>(null, [Validators.required]);
  courseControl  = new FormControl<number|null>(null, [Validators.required]);
 

  title : string='';
  
  registrationForm= new FormGroup({
  
    studentId : this.studentControl,
    courseId : this.courseControl,
  
  });

  studentOption$ : Observable<Student[]>;
  courseOption$ : Observable<Course[]>;


  constructor(private store: Store, private matDialogRef: MatDialogRef<RegistrationFormDialogComponent>){

    this.studentOption$ = this.store.select(selectStudentOptions);
    this.courseOption$   = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(RegistrationActions.loadStudentOptions());
    this.store.dispatch(RegistrationActions.loadCourseOptions());
  }

  
  onSubmit(): void {

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
    } 
    else 
    {
     this.store.dispatch(RegistrationActions.createRegistration({ data: this.registrationForm.getRawValue() }));
     this.matDialogRef.close();
    }
  }
}
