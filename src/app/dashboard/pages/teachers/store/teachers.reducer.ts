import { createFeature, createReducer, on } from '@ngrx/store';
import { TeachersActions } from './teachers.actions';
import { Teacher } from '../models';
import { Course } from '../../courses/models';


export const teachersFeatureKey = 'teachers';

export interface State {
 teachers: Teacher[],
 teacherDetail : Teacher | null,
 loading : boolean;
 error: unknown;
}

export const initialState: State = {
teachers: [],
teacherDetail : null,
loading : false,
 error: null,
};

export const reducer = createReducer(
  initialState,


  on(TeachersActions.loadTeachers, state => {
    return {...state, loading: true};
  }),

  on(TeachersActions.loadTeachersSuccess, (state, action) => {
    return {
      ...state,
      teachers: action.data,
      loading:false
    };
  }),

  on(TeachersActions.loadTeachersFailure, (state, action) => {
    return {
      ...state,
      error : action.error,
      loading : false
    }
  }),


 

  on(TeachersActions.loadTeacherDetail, (state, action) => {
    return {
      ...state,
      teacherDetail: state.teachers.find((t) => t.id == action.teacherId) || null,
    }
  }),

);

export const teachersFeature = createFeature({
  name: teachersFeatureKey,
  reducer,
});

