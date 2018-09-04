import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import itemSaga from './item';

function* mySaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(itemSaga),
  ]);
}

export default mySaga;
