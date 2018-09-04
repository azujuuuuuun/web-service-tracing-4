/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const fetchUserRequested = createAction('FETCH_USER_REQUESTED');
export const fetchUserSucceeded = createAction('FETCH_USER_SUCCEEDED');
export const fetchUserFailed = createAction('FETCH_USER_FAILED');
