import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  fetchUserRequested, fetchUserSucceeded, fetchUserFailed,
  fetchUsersRequested, fetchUsersSucceeded, fetchUsersFailed,
  updateUserRequested, updateUserSucceeded, updateUserFailed,
} from '../actions';

const Api = {
  fetchUser: async (username) => {
    try {
      const res = await axios({
        method: 'get',
        url: `/api/users/${username}`,
      });
      const { data } = res;
      const { user } = data;
      return { user };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  fetchUsers: async () => {
    try {
      const res = await axios({
        method: 'get',
        url: '/api/users',
      });
      const { data } = res;
      const { users } = data;
      return { users };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  updateUser: async (payload) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'put',
        url: '/api/users',
        headers: {
          token,
        },
        data: {
          payload,
        },
      });
      const { data } = res;
      return { data };
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

function* fetchUsers() {
  try {
    const { err, users } = yield call(Api.fetchUsers);
    if (err) {
      yield put(fetchUsersFailed({ message: err.message }));
    } else if (users) {
      yield put(fetchUsersSucceeded({ users }));
    }
  } catch (e) {
    yield put(fetchUsersFailed({ message: e.message }));
  }
}

function* updateUser(action) {
  try {
    const { err, data } = yield call(Api.updateUser, action.payload);
    if (err) {
      yield put(updateUserFailed({ message: err.message }));
    } else if (data) {
      yield put(updateUserSucceeded());
    }
  } catch (e) {
    yield put(updateUserFailed({ message: e.message }));
  }
}

function* watchFetchUser() {
  yield takeEvery(fetchUserRequested.getType(), fetchUser);
}

function* watchFetchUsers() {
  yield takeEvery(fetchUsersRequested.getType(), fetchUsers);
}

function* watchUpdateUser() {
  yield takeEvery(updateUserRequested.getType(), updateUser);
}

function* rootSaga() {
  yield all([
    fork(watchFetchUser),
    fork(watchFetchUsers),
    fork(watchUpdateUser),
  ]);
}

export default rootSaga;
