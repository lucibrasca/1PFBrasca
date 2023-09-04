import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeachers from './teachers.reducer';

export const selectTeachersState = createFeatureSelector<fromTeachers.State>(
  fromTeachers.teachersFeatureKey
);

export const selectTeachers = createSelector(selectTeachersState, (estado) => estado.teachers);

export const selectTeacherName = createSelector(selectTeachersState, (state) => {return state.teacherDetail?.nombre +' '+state.teacherDetail?.apellido});

export const selectTeacherEmail = createSelector(selectTeachersState, (state) => state.teacherDetail?.email);

