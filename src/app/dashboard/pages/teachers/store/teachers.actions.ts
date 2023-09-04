import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateTeacherData, Teacher } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const TeachersActions = createActionGroup({
  source: 'Teachers',
  events: {
    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ data: Teacher[] }>(),
    'Load Teachers Failure': props<{ error: HttpErrorResponse }>(),

    'Create Teacher': props<{ data: CreateTeacherData }>(),
    'Create Teacher Success': props<{ data: Teacher }>(),
    'Create Teacher Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Teacher': props<{ id: number }>(),
    'Delete Teacher Success': emptyProps(),
    'Delete Teacher Failure': props<{ error: HttpErrorResponse }>(),
    
    'Load Teacher Detail': props<{ teacherId: number }>(),
  }
});
