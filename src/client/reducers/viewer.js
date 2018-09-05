import { createReducer } from 'redux-act';

import {
  signupSucceeded,
  loginSucceeded,
  logoutSucceeded,
  authenticateSucceeded,
  followRequested,
  unfollowRequested,
} from '../actions';

const defaultState = {
  isLoggedIn: false,
  followings: [],
  stocks: [],
};

const viewer = createReducer({
  [signupSucceeded]: (state, payload) => Object.assign({}, state, {
    isLoggedIn: true,
    ...payload.user,
  }),
  [loginSucceeded]: (state, payload) => Object.assign({}, state, {
    isLoggedIn: true,
    ...payload.user,
  }),
  [logoutSucceeded]: () => ({ isLoggedIn: false }),
  [authenticateSucceeded]: (state, payload) => Object.assign({}, state, {
    isLoggedIn: true,
    ...payload.user,
  }),
  [followRequested]: (state, payload) => Object.assign({}, state, {
    followings: [
      payload.user,
      ...state.followings,
    ],
  }),
  [unfollowRequested]: (state, payload) => Object.assign({}, state, {
    followings: state.followings.filter(f => f.id !== payload.followedId),
  }),
}, defaultState);

export default viewer;
