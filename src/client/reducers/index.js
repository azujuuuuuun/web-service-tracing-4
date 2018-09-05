import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loading from './loading';
import viewer from './viewer';
import { user, users } from './user';
import { item, items } from './item';
import dropdown from './dropdown';

export default combineReducers({
  loading,
  viewer,
  user,
  users,
  item,
  items,
  dropdown,
  form: formReducer,
});
