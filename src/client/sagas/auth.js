import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  signupRequested, signupSucceeded, signupFailed,
  loginRequested, loginSucceeded, loginFailed,
  logoutRequested, logoutSucceeded, logoutFailed,
  authenticateRequested, authenticateSucceeded, authenticateFailed,
} from '../actions';
import history from '../history';

const Api = {
  signup: async (username, password) => {
    try {
      const res = await axios({
        method: 'post',
        url: '/signup',
        data: {
          username,
          password,
        },
      });
      const { data } = res;
      const { token, user } = data;
      localStorage.setItem('token', token);
      return { user };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  login: async (username, password) => {
    try {
      const res = await axios({
        method: 'post',
        url: '/login',
        data: {
          username,
          password,
        },
      });
      const { data } = res;
      const { token, user } = data;
      localStorage.setItem('token', token);
      return { user };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  authenticate: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/auth',
        headers: {
          token,
        },
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

function* signup(action) {
  try {
    const { err, user } = yield call(Api.signup, action.payload.username, action.payload.password);
    if (err) {
      yield put(signupRequested({ message: err.message }));
    } else if (user) {
      yield call(history.push, '/');
      yield put(signupSucceeded({ user }));
    }
  } catch (e) {
    yield put(signupFailed({ message: e.message }));
  }
}

function* login(action) {
  try {
    const { err, user } = yield call(Api.login, action.payload.username, action.payload.password);
    if (err) {
      yield put(loginFailed({ message: err.message }));
    } else if (user) {
      yield call(history.push, '/');
      yield put(loginSucceeded({ user }));
    }
  } catch (e) {
    yield put(loginFailed({ message: e.message }));
  }
}

function* logout() {
  try {
    localStorage.removeItem('token');
    yield call(history.push, '/');
    yield put(logoutSucceeded());
  } catch (e) {
    yield put(logoutFailed({ message: e.message }));
  }
}

function* authenticate() {
  try {
    const { err, user } = yield call(Api.authenticate);
    if (err) {
      yield put(authenticateFailed({ message: err.message }));
    } else if (user) {
      yield put(authenticateSucceeded({ user }));
    }
  } catch (e) {
    yield put(authenticateFailed({ message: e.message }));
  }
}

function* watchSignup() {
  yield takeEvery(signupRequested.getType(), signup);
}

function* watchLogin() {
  yield takeEvery(loginRequested.getType(), login);
}

function* watchLogout() {
  yield takeEvery(logoutRequested.getType(), logout);
}

function* watchAuthenticate() {
  yield takeEvery(authenticateRequested.getType(), authenticate);
}

function* rootSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAuthenticate),
  ]);
}

export default rootSaga;
