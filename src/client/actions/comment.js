/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const postCommentRequested = createAction('POST_COMMENT_REQUESTED');
export const postCommentSucceeded = createAction('POST_COMMENT_SUCCEEDED');
export const postCommentFailed = createAction('POST_COMMENT_FAILED');
