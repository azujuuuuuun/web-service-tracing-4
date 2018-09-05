/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const fetchUserRequested = createAction('FETCH_USER_REQUESTED');
export const fetchUserSucceeded = createAction('FETCH_USER_SUCCEEDED');
export const fetchUserFailed = createAction('FETCH_USER_FAILED');

export const fetchUsersRequested = createAction('FETCH_USERS_REQUESTED');
export const fetchUsersSucceeded = createAction('FETCH_USERS_SUCCEEDED');
export const fetchUsersFailed = createAction('FETCH_USERS_FAILED');
