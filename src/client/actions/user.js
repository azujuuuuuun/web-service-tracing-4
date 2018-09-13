/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const fetchUserRequested = createAction('FETCH_USER_REQUESTED');
export const fetchUserSucceeded = createAction('FETCH_USER_SUCCEEDED');
export const fetchUserFailed = createAction('FETCH_USER_FAILED');

export const fetchUsersRequested = createAction('FETCH_USERS_REQUESTED');
export const fetchUsersSucceeded = createAction('FETCH_USERS_SUCCEEDED');
export const fetchUsersFailed = createAction('FETCH_USERS_FAILED');

export const updateUserRequested = createAction('UPDATE_USER_REQUESTED');
export const updateUserSucceeded = createAction('UPDATE_USER_SUCCEEDED');
export const updateUserFailed = createAction('UPDATE_USER_FAILED');

export const updatePasswordRequested = createAction('UPDATE_PASSWORD_REQUESTED');
export const updatePasswordSucceeded = createAction('UPDATE_PASSWORD_SUCCEEDED');
export const updatePasswordFailed = createAction('UPDATE_PASSWORD_FAILED');

export const followRequested = createAction('FOLLOW_REQUESTED');
export const followSucceeded = createAction('FOLLOW_SUCCEEDED');
export const followFailed = createAction('FOLLOW_FAILED');

export const unfollowRequested = createAction('UNFOLLOW_REQUESTED');
export const unfollowSucceeded = createAction('UNFOLLOW_SUCCEEDED');
export const unfollowFailed = createAction('UNFOLLOW_FAILED');

export const uploadImageRequested = createAction('UPLOAD_IMAGE_REQUESTED');
export const uploadImageSucceeded = createAction('UPLOAD_IMAGE_SUCCEEDED');
export const uploadImageFailed = createAction('UPLOAD_IMAGE_FAILED');
