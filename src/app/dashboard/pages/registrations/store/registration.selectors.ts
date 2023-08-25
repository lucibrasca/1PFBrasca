import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistration from './registration.reducer';

export const selectRegistrationState = createFeatureSelector<fromRegistration.State>(
  fromRegistration.registrationFeatureKey
);

export const selectRegistration = createSelector(selectRegistrationState, (state) => state.data);

export const selectStudentOptions = createSelector(selectRegistrationState, (state) => state.studentOptions);

export const selectCourseOptions = createSelector(selectRegistrationState, (state) => state.courseOptions);

