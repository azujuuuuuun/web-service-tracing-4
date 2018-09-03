import { createReducer } from 'redux-act';

import {
  signupSucceeded,
  loginSucceeded,
  logoutSucceeded,
  authenticateSucceeded,
} from '../actions';

const defaultState = {
  isLoggedIn: false,
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
}, defaultState);

export default viewer;
