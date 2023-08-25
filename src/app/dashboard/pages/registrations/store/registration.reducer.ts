import { createFeature, createReducer, on } from '@ngrx/store';
import { RegistrationActions } from './registration.actions';
import { RegistrationWithStudentAndCourse } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const registrationFeatureKey = 'registration';

export interface State {
 data: RegistrationWithStudentAndCourse[];
 studentOptions : Student[],
 courseOptions : Course[],
 loading : boolean;
 error: unknown;
}

export const initialState: State = {
 data: [],
 studentOptions : [],
 courseOptions : [],
 loading: false,
 error: null,
};

export const reducer = createReducer(

  initialState,

  on(RegistrationActions.loadRegistrations, state => {
    return {...state, loading: true};
  }),

  on(RegistrationActions.loadRegistrationsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading:false
    };
  }),

  on(RegistrationActions.loadRegistrationsFailure, (state, action) => {
    return {
      ...state,
      error : action.error,
      loading : false
    }
  }),


  on(RegistrationActions.loadStudentOptions, (state) => state),

  on(RegistrationActions.loadStudentOptionsSuccess, (state, action) => {
    return {
      ...state,
      studentOptions : action.data
    };
  }),

  on(RegistrationActions.loadStudentOptionsFailure, (state, action) => {
    return {
      ...state,
      error : action.error
    }
  }),


  on(RegistrationActions.loadCourseOptions, (state) => state),

  on(RegistrationActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions : action.data
    };
  }),

  on(RegistrationActions.loadCourseOptionsFailure, (state, action) => {
    return {
      ...state,
      error : action.error
    }
  }),




);

export const registrationFeature = createFeature({
  name: registrationFeatureKey,
  reducer,
});

