/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const likeRequested = createAction('LIKE_REQUESTED');
export const likeSucceeded = createAction('LIKE_SUCCEEDED');
export const likeFailed = createAction('LIKE_FAILED');
