import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import itemSaga from './item';
import tagSaga from './tag';
import likeSaga from './like';
import stockSaga from './stock';
import commentSaga from './comment';
import notificationSaga from './notification';

function* mySaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(itemSaga),
    fork(tagSaga),
    fork(likeSaga),
    fork(stockSaga),
    fork(commentSaga),
    fork(notificationSaga),
  ]);
}

export default mySaga;
