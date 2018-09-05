import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  likeRequested, likeSucceeded, likeFailed,
  unlikeRequested, unlikeSucceeded, unlikeFailed,
} from '../actions';

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
  unlike: async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      await axios({
        method: 'delete',
        url: `/likes/${itemId}`,
        headers: {
          token,
        },
      });
      return { data: 'Deleteing like succeeded' };
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

function* unlike(action) {
  try {
    const { itemId, userId } = action.payload;
    const { err, data } = yield call(Api.unlike, itemId);
    if (err) {
      yield put(unlikeFailed({ message: err.message }));
    } else if (data) {
      yield put(unlikeSucceeded({ itemId, userId }));
    }
  } catch (e) {
    yield put(unlikeFailed({ message: e.message }));
  }
}

function* watchLike() {
  yield takeEvery(likeRequested.getType(), like);
}

function* watchUnlike() {
  yield takeEvery(unlikeRequested.getType(), unlike);
}

function* rootSaga() {
  yield all([
    fork(watchLike),
    fork(watchUnlike),
  ]);
}

export default rootSaga;
