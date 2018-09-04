import { createReducer } from 'redux-act';

import {
  authenticateRequested, authenticateSucceeded, authenticateFailed,
  fetchItemRequested, fetchItemSucceeded, fetchItemFailed,
  fetchItemsRequested, fetchItemsSucceeded, fetchItemsFailed,
} from '../actions';

const defaultState = true;

const loading = createReducer({
  [authenticateRequested]: () => true,
  [authenticateSucceeded]: () => false,
  [authenticateFailed]: () => false,
  [fetchItemRequested]: () => true,
  [fetchItemSucceeded]: () => false,
  [fetchItemFailed]: () => false,
  [fetchItemsRequested]: () => true,
  [fetchItemsSucceeded]: () => false,
  [fetchItemsFailed]: () => false,
}, defaultState);

export default loading;
