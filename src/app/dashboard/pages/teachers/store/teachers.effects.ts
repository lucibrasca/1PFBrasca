import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TeachersActions } from './teachers.actions';
import { CreateTeacherData, Teacher } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { NotifierService } from 'src/app/core/services/notifier.service';


@Injectable()
export class TeachersEffects {


  loadTeachers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.loadTeachers),
      concatMap(() =>
      
        this.getTeacherFromDB().pipe(
          map(data => TeachersActions.loadTeachersSuccess({ data })),
          catchError(error => of(TeachersActions.loadTeachersFailure({ error }))))
      )
    );
  });

 

  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.createTeacher),
      concatMap((action) =>
      
        this.createTeacher(action.data).pipe(
          map(data => TeachersActions.createTeacherSuccess({ data })),
          catchError(error => of(TeachersActions.createTeacherFailure({ error }))))
      )
    );
  });

  createTeacherSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.createTeacherSuccess),
      map(() => {this.store.dispatch(TeachersActions.loadTeachers())
                  this.notifier.showSuccess('Profesor guardado')}
      )
    );
  }, { dispatch: false});


  deleteTeacher$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.deleteTeacher),
      concatMap((action) =>
      
        this.deleteTeacher(action.id).pipe(
          map(data => TeachersActions.deleteTeacherSuccess()),
          catchError(error => of(TeachersActions.deleteTeacherFailure({ error }))))
      )
    );
  });


  deleteTeacherSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.deleteTeacherSuccess),
      map(() => {this.store.dispatch(TeachersActions.loadTeachers())
                this.notifier.showSuccess('Profesor eliminado')}
      )
    );
  }, { dispatch: false});



  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store, private notifier: NotifierService) {}


private getTeacherFromDB(): Observable<Teacher[]>
{
  return this.httpClient.get<Teacher[]>(environment.baseApiUrl+'/teachers');
}



private createTeacher( data: CreateTeacherData) : Observable<Teacher>
{
  return this.httpClient.post<Teacher>(environment.baseApiUrl+'/teachers', data);
}


private deleteTeacher( id: number) : Observable<void>
{
 return  this.httpClient.delete<void>(environment.baseApiUrl+'/teachers/' + id);
}

}
