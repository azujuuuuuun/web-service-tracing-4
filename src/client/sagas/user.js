import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { fetchUserRequested, fetchUserSucceeded, fetchUserFailed } from '../actions';

const Api = {
  fetchUser: async (username) => {
    try {
      const res = await axios({
        method: 'get',
        url: `/users/${username}`,
      });
      const { data } = res;
      const { user } = data;
      return { user };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
};

function* fetchUser(action) {
  try {
    const { err, user } = yield call(Api.fetchUser, action.payload.username);
    if (err) {
      yield put(fetchUserFailed({ message: err.message }));
    } else if (user) {
      yield put(fetchUserSucceeded({ user }));
    }
  } catch (e) {
    yield put(fetchUserFailed({ message: e.message }));
  }
}

function* watchFetchUser() {
  yield takeEvery(fetchUserRequested.getType(), fetchUser);
}

function* rootSaga() {
  yield all([fork(watchFetchUser)]);
}

export default rootSaga;
