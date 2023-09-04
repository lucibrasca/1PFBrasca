import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CourseActions } from './course.actions';
import { HttpClient } from '@angular/common/http';
import { CourseWithTeacher } from '../models';
import { environment } from 'src/environments/environment';
import { Teacher } from '../../teachers/models';


@Injectable()
export class CourseEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourses),
      concatMap(() =>
      
        this.getCourseFromDB().pipe(
          map(data => CourseActions.loadCoursesSuccess({ data })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    );
  });

  loadTeacherOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadTeacherOptions),
      concatMap(() =>
      
        this.getTeacherOptions().pipe(
          map(data => CourseActions.loadTeacherOptionsSuccess({ data })),
          catchError(error => of(CourseActions.loadTeacherOptionsFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions,  private httpClient: HttpClient) {}

  private getCourseFromDB(): Observable<CourseWithTeacher[]>
{
  return this.httpClient.get<CourseWithTeacher[]>(environment.baseApiUrl+'/courses?_expand=teacher');
}

private getTeacherOptions() : Observable<Teacher[]>
{
  return this.httpClient.get<Teacher[]>(environment.baseApiUrl+'/teachers');
}
}
