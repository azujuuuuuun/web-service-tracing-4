import { createReducer } from 'redux-act';

import { fetchUserSucceeded } from '../actions';

const defaultState = {
  items: [],
};

const user = createReducer({
  [fetchUserSucceeded]: (state, payload) => payload.user,
}, defaultState);

export default user;
