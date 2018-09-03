import { createReducer } from 'redux-act';

import { authenticateRequested, authenticateSucceeded, authenticateFailed } from '../actions';

const defaultState = true;

const loading = createReducer({
  [authenticateRequested]: () => true,
  [authenticateSucceeded]: () => false,
  [authenticateFailed]: () => false,
}, defaultState);

export default loading;
