import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CourseActions } from './course.actions';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models';
import { environment } from 'src/environments/environment';


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

  constructor(private actions$: Actions,  private httpClient: HttpClient) {}

  private getCourseFromDB(): Observable<Course[]>
{
  return this.httpClient.get<Course[]>(environment.baseApiUrl+'/courses');
}
}
