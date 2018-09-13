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
  updatePasswordRequested, updatePasswordSucceeded, updatePasswordFailed,
  followRequested, followSucceeded, followFailed,
  unfollowRequested, unfollowSucceeded, unfollowFailed,
  uploadImageRequested, uploadImageSucceeded, uploadImageFailed,
} from '../actions';
import history from '../history';

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
  updatePassword: async (currentPassword, newPassword) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'put',
        url: '/api/users/password',
        headers: {
          token,
        },
        data: {
          currentPassword,
          newPassword,
        },
      });
      const { data } = res;
      return { data };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  follow: async (followedId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: `/api/users/${followedId}/follow`,
        headers: {
          token,
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
        url: `/api/users/${followedId}/unfollow`,
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
  uploadImage: async (image) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/upload',
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
        data: image,
      });
      const { data } = res;
      const { avatarImgSrc } = data;
      return { avatarImgSrc };
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

function* updatePassword(action) {
  try {
    const { currentPassword, newPassword } = action.payload;
    const { err, data } = yield call(Api.updatePassword, currentPassword, newPassword);
    if (err) {
      yield put(updatePasswordFailed({ message: err.message }));
    } else if (data) {
      yield put(updatePasswordSucceeded());
    }
  } catch (e) {
    yield put(updatePasswordFailed({ message: e.message }));
  }
}

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

function* unloadImage(action) {
  try {
    const { err, avatarImgSrc } = yield call(Api.uploadImage, action.payload.image);
    if (err) {
      yield put(uploadImageFailed({ message: err.message }));
    } else if (avatarImgSrc) {
      yield call(history.push, '/settings/account');
      yield put(uploadImageSucceeded({ avatarImgSrc }));
    }
  } catch (e) {
    yield put(uploadImageFailed({ message: e.message }));
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

function* watchUpdatePassword() {
  yield takeEvery(updatePasswordRequested.getType(), updatePassword);
}

function* watchFollow() {
  yield takeEvery(followRequested.getType(), follow);
}

function* watchUnfollow() {
  yield takeEvery(unfollowRequested.getType(), unfollow);
}

function* watchUploadImage() {
  yield takeEvery(uploadImageRequested.getType(), unloadImage);
}

function* rootSaga() {
  yield all([
    fork(watchFetchUser),
    fork(watchFetchUsers),
    fork(watchUpdateUser),
    fork(watchUpdatePassword),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchUploadImage),
  ]);
}

export default rootSaga;
