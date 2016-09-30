import { createSelector } from 'reselect';

const authSelector = state => state.app.auth;

export const isAuthenticated = createSelector(
  authSelector,
  (auth) => auth.authenticated,
);

export const getAuthError = createSelector(
  authSelector,
  (auth) => auth.error,
);
