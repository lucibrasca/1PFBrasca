import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {  CourseWithTeacher } from '../models';
import { Teacher } from '../../teachers/models';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: CourseWithTeacher[] }>(),
    'Load Courses Failure': props<{ error: HttpErrorResponse }>(),
    

    'Load Teacher Options': emptyProps(),
    'Load Teacher Options Success': props<{ data: Teacher[]}>(),
    'Load Teacher Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses Detail': props<{ courseId: number }>(),
  }
});
