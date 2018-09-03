import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';

function* mySaga() {
  yield all([fork(authSaga)]);
}

export default mySaga;
