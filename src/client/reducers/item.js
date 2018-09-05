import { createReducer } from 'redux-act';

import {
  postItemSucceeded,
  fetchItemSucceeded,
  likeSucceeded,
  postCommentSucceeded,
  fetchItemsSucceeded,
} from '../actions';

const itemDefaultState = {
  likers: [],
  comments: [],
};
const itemsDefaultState = [];

export const item = createReducer({
  [postItemSucceeded]: (state, payload) => payload.item,
  [fetchItemSucceeded]: (state, payload) => payload.item,
  [likeSucceeded]: (state, payload) => Object.assign({}, state, {
    likers: [
      payload.user,
      ...state.likers,
    ],
  }),
  [postCommentSucceeded]: (state, payload) => Object.assign({}, state, {
    comments: [
      payload.comment,
      ...state.comments,
    ],
  }),
}, itemDefaultState);

export const items = createReducer({
  [fetchItemsSucceeded]: (state, payload) => payload.items,
}, itemsDefaultState);
