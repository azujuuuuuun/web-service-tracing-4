/* eslint-disable import/prefer-default-export */

import { createAction } from 'redux-act';

export const stockRequested = createAction('STOCK_REQUESTED');
export const stockSucceeded = createAction('STOCK_SUCCEEDED');
export const stockFailed = createAction('STOCK_FAILED');

export const unstockRequested = createAction('UNSTOCK_REQUESTED');
export const unstockSucceeded = createAction('UNSTOCK_SUCCEEDED');
export const unstockFailed = createAction('UNSTOCK_FAILED');
