import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loading from './loading';
import viewer from './viewer';

export default combineReducers({
  loading,
  viewer,
  form: formReducer,
});
