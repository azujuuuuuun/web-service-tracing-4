/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const signupRequested = createAction('SIGNUP_REQUESTED');
export const signupSucceeded = createAction('SIGNUP_SUCCEEDED');
export const signupFailed = createAction('SIGNUP_FAILED');

export const loginRequested = createAction('LOGIN_REQUESTED');
export const loginSucceeded = createAction('LOGIN_SUCCEEDED');
export const loginFailed = createAction('LOGIN_FAILED');

export const logoutRequested = createAction('LOGOUT_REQUESTED');
export const logoutSucceeded = createAction('LOGOUT_SUCCEEDED');
export const logoutFailed = createAction('LOGOUT_FAILED');

export const authenticateRequested = createAction('AUTHENTICATE_REQUESTED');
export const authenticateSucceeded = createAction('AUTHENTICATE_SUCCEEDED');
export const authenticateFailed = createAction('AUTHENTICATE_FAILED');
