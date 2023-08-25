import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { Course } from '../models';

export const courseFeatureKey = 'course';

export interface State {
  courses: Course[],
  courseDetail: Course | null,
  loading: boolean
}

export const initialState: State = {
  courses: [],
  courseDetail: null,
  loading: false
};

export const reducer = createReducer(
  initialState,
 
  on(CourseActions.loadCourses, state => {
    return {...state, loading: true};
  }),

  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      loading:false
    };
  }),

  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error : action.error,
      loading : false
    }
  }),

  on(CourseActions.loadCoursesDetail, (state, action) => {
    return {
      ...state,
      courseDetail: state.courses.find((c) => c.id == action.courseId) || null,
    }
  })
 
);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

