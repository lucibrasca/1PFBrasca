import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeachers from './teachers.reducer';

export const selectTeachersState = createFeatureSelector<fromTeachers.State>(
  fromTeachers.teachersFeatureKey
);

export const selectTeachers = createSelector(selectTeachersState, (estado) => estado.teachers);

export const selectCourseOptions = createSelector(selectTeachersState, (state) => state.courseOptions);

export const selectTeacherName = createSelector(selectTeachersState, (state) => {return state.teacherDetail?.nombre +' '+state.teacherDetail?.apellido});

