import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);


export const selectCourse = createSelector(selectCourseState, (state) => state.courses)

export const selectCourseDetailName = createSelector(selectCourseState, (state) => state.courseDetail?.nombre)

export const selectCourseDetailFechaInicio = createSelector(selectCourseState, (state) => state.courseDetail?.fechaInicio)

export const selectCourseDetailFechaFin = createSelector(selectCourseState, (state) => state.courseDetail?.fechaFin)

export const selectCourseDetailTeacher = createSelector(selectCourseState, (state) => state.courseDetail?.teacher.nombre +' '+ state.courseDetail?.teacher.apellido )

export const selectTeacherOptions = createSelector(selectCourseState, (state) => state.teacherOptions);
