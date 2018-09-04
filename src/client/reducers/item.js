import { createReducer } from 'redux-act';

import { postItemSucceeded, fetchItemSucceeded, fetchItemsSucceeded } from '../actions';

const itemDefaultState = {};
const itemsDefaultState = [];

export const item = createReducer({
  [postItemSucceeded]: (state, payload) => payload.item,
  [fetchItemSucceeded]: (state, payload) => payload.item,
}, itemDefaultState);

export const items = createReducer({
  [fetchItemsSucceeded]: (state, payload) => payload.items,
}, itemsDefaultState);
