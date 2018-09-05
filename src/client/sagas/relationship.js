import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  followRequested, followSucceeded, followFailed,
  unfollowRequested, unfollowSucceeded, unfollowFailed,
} from '../actions';

const Api = {
  follow: async (followedId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/relationships',
        headers: {
          token,
        },
        data: {
          followedId,
        },
      });
      const { data } = res;
      return { data: data.relationship };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  unfollow: async (followedId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      await axios({
        method: 'delete',
        url: `/relationships/${followedId}`,
        headers: {
          token,
        },
      });
      return { data: 'Deleteing relationship succeeded' };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
};

function* follow(action) {
  try {
    const { user } = action.payload;
    const { err, data } = yield call(Api.follow, user.id);
    if (err) {
      yield put(followFailed({ message: err.message }));
    } else if (data) {
      yield put(followSucceeded({ user }));
    }
  } catch (e) {
    yield put(followFailed({ message: e.message }));
  }
}

function* unfollow(action) {
  try {
    const { followedId } = action.payload;
    const { err, data } = yield call(Api.unfollow, followedId);
    if (err) {
      yield put(unfollowFailed({ message: err.message }));
    } else if (data) {
      yield put(unfollowSucceeded({ followedId }));
    }
  } catch (e) {
    yield put(unfollowFailed({ message: e.message }));
  }
}

function* watchFollow() {
  yield takeEvery(followRequested.getType(), follow);
}

function* watchUnfollow() {
  yield takeEvery(unfollowRequested.getType(), unfollow);
}

function* rootSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}

export default rootSaga;
