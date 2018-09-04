import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loading from './loading';
import viewer from './viewer';
import user from './user';
import { item, items } from './item';

export default combineReducers({
  loading,
  viewer,
  user,
  item,
  items,
  form: formReducer,
});
