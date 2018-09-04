import { createReducer } from 'redux-act';

import {
  postItemSucceeded,
  fetchItemSucceeded,
  likeSucceeded,
  postCommentSucceeded,
  fetchItemsSucceeded,
} from '../actions';

const itemDefaultState = {
  likes: [],
  comments: [],
};
const itemsDefaultState = [];

export const item = createReducer({
  [postItemSucceeded]: (state, payload) => payload.item,
  [fetchItemSucceeded]: (state, payload) => payload.item,
  [likeSucceeded]: (state, payload) => Object.assign({}, state, {
    likes: [
      payload.like,
      ...state.likes,
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
