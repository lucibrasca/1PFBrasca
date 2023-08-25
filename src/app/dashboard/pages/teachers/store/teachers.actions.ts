import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateTeacherData, Teacher, TeacherWithCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';

export const TeachersActions = createActionGroup({
  source: 'Teachers',
  events: {
    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ data: TeacherWithCourse[] }>(),
    'Load Teachers Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[]}>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Teacher': props<{ data: CreateTeacherData }>(),
    'Create Teacher Success': props<{ data: Teacher }>(),
    'Create Teacher Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Teacher': props<{ id: number }>(),
    'Delete Teacher Success': emptyProps(),
    'Delete Teacher Failure': props<{ error: HttpErrorResponse }>(),
    
    'Load Teacher Detail': props<{ courseId: number }>(),
  }
});
