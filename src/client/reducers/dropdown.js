import { createReducer } from 'redux-act';

import { closeDropdown, openDropdown } from '../actions';

const defaultState = {
  kind: '',
  isOpen: false,
};

const dropdown = createReducer({
  [openDropdown]: (state, payload) => Object.assign({}, state, {
    kind: payload.kind,
    isOpen: true,
  }),
  [closeDropdown]: state => Object.assign({}, state, {
    kind: '',
    isOpen: false,
  }),
}, defaultState);

export default dropdown;
