import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loading from './loading';
import viewer from './viewer';
import { item, items } from './item';

export default combineReducers({
  loading,
  viewer,
  item,
  items,
  form: formReducer,
});
