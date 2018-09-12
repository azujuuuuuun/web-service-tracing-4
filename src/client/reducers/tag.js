import { createReducer } from 'redux-act';

import {
  fetchTagSucceeded,
  fetchTagsSucceeded,
  followTagSucceeded,
  unfollowTagSucceeded,
} from '../actions';

const tagDefaultState = {
  items: [],
  followers: [],
};

export const tag = createReducer({
  [fetchTagSucceeded]: (state, payload) => payload.tag,
  [followTagSucceeded]: (state, payload) => Object.assign({}, state, {
    followers: [
      payload.user,
      ...state.followers,
    ],
  }),
  [unfollowTagSucceeded]: (state, payload) => Object.assign({}, state, {
    followers: state.followers.filter(u => u.id !== payload.userId),
  }),
}, tagDefaultState);

const tagsDefaultState = [];

export const tags = createReducer({
  [fetchTagsSucceeded]: (state, payload) => payload.tags,
}, tagsDefaultState);
