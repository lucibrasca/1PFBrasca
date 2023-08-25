import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState, authFeatureKey } from "./auth.reducer"


export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(selectAuthState, (estado) => estado.authUser);

export const selectAuthUserRol = createSelector(selectAuthState, (estado) => estado.authUser?.rol);

export const selectIsAdmin  = createSelector(selectAuthState, (estado) => estado.authUser?.rol === 'ADMINISTRADOR')