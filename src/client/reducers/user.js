import { createReducer } from 'redux-act';

import { fetchUserSucceeded, fetchUsersSucceeded } from '../actions';

const userDefaultState = {
  items: [],
  followingTags: [],
};

export const user = createReducer({
  [fetchUserSucceeded]: (state, payload) => payload.user,
}, userDefaultState);

const usersDefaultState = [];

export const users = createReducer({
  [fetchUsersSucceeded]: (state, payload) => payload.users,
}, usersDefaultState);
