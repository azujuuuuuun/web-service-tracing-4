/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const fetchTagRequested = createAction('FETCH_TAG_REQUESTED');
export const fetchTagSucceeded = createAction('FETCH_TAG_SUCCEEDED');
export const fetchTagFailed = createAction('FETCH_TAG_FAILED');

export const fetchTagsRequested = createAction('FETCH_TAGS_REQUESTED');
export const fetchTagsSucceeded = createAction('FETCH_TAGS_SUCCEEDED');
export const fetchTagsFailed = createAction('FETCH_TAGS_FAILED');

export const followTagRequested = createAction('FOLLOW_TAG_REQUESTED');
export const followTagSucceeded = createAction('FOLLOW_TAG_SUCCEEDED');
export const followTagFailed = createAction('FOLLOW_TAG_FAILED');

export const unfollowTagRequested = createAction('UNFOLLOW_TAG_REQUESTED');
export const unfollowTagSucceeded = createAction('UNFOLLOW_TAG_SUCCEEDED');
export const unfollowTagFailed = createAction('UNFOLLOW_TAG_FAILED');
