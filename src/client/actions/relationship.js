/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const followRequested = createAction('FOLLOW_REQUESTED');
export const followSucceeded = createAction('FOLLOW_SUCCEEDED');
export const followFailed = createAction('FOLLOW_FAILED');

export const unfollowRequested = createAction('UNFOLLOW_REQUESTED');
export const unfollowSucceeded = createAction('UNFOLLOW_SUCCEEDED');
export const unfollowFailed = createAction('UNFOLLOW_FAILED');
