import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import itemSaga from './item';

function* mySaga() {
  yield all([
    fork(authSaga),
    fork(itemSaga),
  ]);
}

export default mySaga;
