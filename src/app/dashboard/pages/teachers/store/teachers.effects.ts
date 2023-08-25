import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TeachersActions } from './teachers.actions';
import { CreateTeacherData, Teacher, TeacherWithCourse } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';


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

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.loadCourseOptions),
      concatMap(() =>
      
        this.getCourseOptions().pipe(
          map(data => TeachersActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(TeachersActions.loadCourseOptionsFailure({ error }))))
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

  createRegistationSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.createTeacherSuccess),
      map(() => this.store.dispatch(TeachersActions.loadTeachers())
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


  deleteRegistationSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TeachersActions.deleteTeacherSuccess),
      map(() => this.store.dispatch(TeachersActions.loadTeachers())
      )
    );
  }, { dispatch: false});



  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}


private getTeacherFromDB(): Observable<TeacherWithCourse[]>
{
  return this.httpClient.get<TeacherWithCourse[]>(environment.baseApiUrl+'/teachers?_expand=course');
}

private getCourseOptions() : Observable<Course[]>
{
  return this.httpClient.get<Course[]>(environment.baseApiUrl+'/courses');
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
