/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const postItemRequested = createAction('POST_ITEM_REQUESTED');
export const postItemSucceeded = createAction('POST_ITEM_SUCCEEDED');
export const postItemFailed = createAction('POST_ITEM_FAILED');

export const fetchItemRequested = createAction('FETCH_ITEM_REQUESTED');
export const fetchItemSucceeded = createAction('FETCH_ITEM_SUCCEEDED');
export const fetchItemFailed = createAction('FETCH_ITEM_FAILED');

export const fetchItemsRequested = createAction('FETCH_ITEMS_REQUESTED');
export const fetchItemsSucceeded = createAction('FETCH_ITEMS_SUCCEEDED');
export const fetchItemsFailed = createAction('FETCH_ITEMS_FAILED');

export const likeRequested = createAction('LIKE_REQUESTED');
export const likeSucceeded = createAction('LIKE_SUCCEEDED');
export const likeFailed = createAction('LIKE_FAILED');

export const unlikeRequested = createAction('UNLIKE_REQUESTED');
export const unlikeSucceeded = createAction('UNLIKE_SUCCEEDED');
export const unlikeFailed = createAction('UNLIKE_FAILED');

export const stockRequested = createAction('STOCK_REQUESTED');
export const stockSucceeded = createAction('STOCK_SUCCEEDED');
export const stockFailed = createAction('STOCK_FAILED');

export const unstockRequested = createAction('UNSTOCK_REQUESTED');
export const unstockSucceeded = createAction('UNSTOCK_SUCCEEDED');
export const unstockFailed = createAction('UNSTOCK_FAILED');

export const postCommentRequested = createAction('POST_COMMENT_REQUESTED');
export const postCommentSucceeded = createAction('POST_COMMENT_SUCCEEDED');
export const postCommentFailed = createAction('POST_COMMENT_FAILED');
