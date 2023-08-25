import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);


export const selectCourseArray = createSelector(selectCourseState, (state) => state.courses)

export const selectCourseDetailName = createSelector(selectCourseState, (state) => state.courseDetail?.nombre)

export const selectCourseDetailFechaInicio = createSelector(selectCourseState, (state) => state.courseDetail?.fechaInicio)

export const selectCourseDetailFechaFin = createSelector(selectCourseState, (state) => state.courseDetail?.fechaFin)