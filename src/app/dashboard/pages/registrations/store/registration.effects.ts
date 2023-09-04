import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RegistrationActions } from './registration.actions';
import { HttpClient } from '@angular/common/http';
import { CreateRegistrationData, Registration, RegistrationWithStudentAndCourse } from '../models';
import { environment } from 'src/environments/environment';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';
import { NotifierService } from 'src/app/core/services/notifier.service';


@Injectable()
export class RegistrationEffects {

  loadRegistrations$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.loadRegistrations),
      concatMap(() =>
      
        this.getRegistrationFromDB().pipe(
          map(data => RegistrationActions.loadRegistrationsSuccess({ data })),
          catchError(error => of(RegistrationActions.loadRegistrationsFailure({ error }))))
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.loadStudentOptions),
      concatMap(() =>
      
        this.getStudentOptions().pipe(
          map(data => RegistrationActions.loadStudentOptionsSuccess({ data })),
          catchError(error => of(RegistrationActions.loadStudentOptionsFailure({ error }))))
      )
    );
  });

  
  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.loadCourseOptions),
      concatMap(() =>
      
        this.getCourseOptions().pipe(
          map(data => RegistrationActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(RegistrationActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });


  createRegistation$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.createRegistration),
      concatMap((action) =>
      
        this.createRegistration(action.data).pipe(
          map(data => RegistrationActions.createRegistrationSuccess({ data })),
          catchError(error => of(RegistrationActions.createRegistrationFailure({ error }))))
      )
    );
  });

  createRegistationSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.createRegistrationSuccess),
      map(() =>{ this.store.dispatch(RegistrationActions.loadRegistrations())
                this.notifier.showSuccess('Inscripción guardada')
                  }
      )
    );
  }, { dispatch: false});



  deleteRegistation$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.deleteRegistration),
      concatMap((action) =>
      
        this.deleteRegistration(action.id).pipe(
          map(data => RegistrationActions.deleteRegistrationSuccess()),
          catchError(error => of(RegistrationActions.deleteRegistrationFailure({ error }))))
      )
    );
  });


  deleteRegistationSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistrationActions.deleteRegistrationSuccess),
      map(() => {this.store.dispatch(RegistrationActions.loadRegistrations())
                  this.notifier.showSuccess('Inscripción eliminada')}
      )
    );
  }, { dispatch: false});

  

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store, private notifier: NotifierService) {

  }

  private getRegistrationFromDB(): Observable<RegistrationWithStudentAndCourse[]>
  {
    return this.httpClient.get<RegistrationWithStudentAndCourse[]>(environment.baseApiUrl+'/registration?_expand=student&_expand=course')
  }

  private getStudentOptions() : Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(environment.baseApiUrl+'/students');
  }

  private getCourseOptions() : Observable<Course[]>
  {
    return this.httpClient.get<Course[]>(environment.baseApiUrl+'/courses');
  }

  private createRegistration( data: CreateRegistrationData) : Observable<Registration>
  {
    return this.httpClient.post<Registration>(environment.baseApiUrl+'/registration', data);
  }

  private deleteRegistration( id: number) : Observable<void>
  {
   return  this.httpClient.delete<void>(environment.baseApiUrl+'/registration/' + id);
  }



}
