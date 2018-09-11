import { createReducer } from 'redux-act';

import {
  postItemSucceeded,
  fetchItemSucceeded,
  likeSucceeded,
  unlikeSucceeded,
  postCommentSucceeded,
  fetchItemsSucceeded,
} from '../actions';

const itemDefaultState = {
  tags: [],
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
  [unlikeSucceeded]: (state, payload) => Object.assign({}, state, {
    likers: state.likers.filter(u => u.id !== payload.userId),
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
