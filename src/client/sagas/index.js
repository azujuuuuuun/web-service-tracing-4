import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import itemSaga from './item';
import likeSaga from './like';

function* mySaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(itemSaga),
    fork(likeSaga),
  ]);
}

export default mySaga;
