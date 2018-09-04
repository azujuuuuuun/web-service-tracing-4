import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { likeRequested, likeSucceeded, likeFailed } from '../actions';

const Api = {
  like: async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/likes',
        headers: {
          token,
        },
        data: {
          itemId,
        },
      });
      const { data } = res;
      return { data: data.like };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
};

function* like(action) {
  try {
    const { err, data } = yield call(Api.like, action.payload.itemId);
    if (err) {
      yield put(likeFailed({ message: err.message }));
    } else if (data) {
      yield put(likeSucceeded({ like: data }));
    }
  } catch (e) {
    yield put(likeFailed({ message: e.message }));
  }
}

function* watchLike() {
  yield takeEvery(likeRequested.getType(), like);
}

function* rootSaga() {
  yield all([fork(watchLike)]);
}

export default rootSaga;
