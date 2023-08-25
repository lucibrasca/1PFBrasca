import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateRegistrationData, Registration, RegistrationWithStudentAndCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const RegistrationActions = createActionGroup({
  source: 'Registration',
  events: {
    'Load Registrations': emptyProps(),
    'Load Registrations Success': props<{ data: RegistrationWithStudentAndCourse[] }>(),
    'Load Registrations Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Options': emptyProps(),
    'Load Student Options Success': props<{ data: Student[]}>(),
    'Load Student Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[]}>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Registration': props<{ data: CreateRegistrationData }>(),
    'Create Registration Success': props<{ data: Registration }>(),
    'Create Registration Failure': props<{ error: HttpErrorResponse }>(),
    
    'Delete Registration': props<{ id: number }>(),
    'Delete Registration Success': emptyProps(),
    'Delete Registration Failure': props<{ error: HttpErrorResponse }>(),




  }
});
