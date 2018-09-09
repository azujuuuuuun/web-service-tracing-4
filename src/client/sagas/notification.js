import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  updateNotificationsRequested, updateNotificationsSucceeded, updateNotificationsFailed,
} from '../actions';

const Api = {
  updateNotifications: async (notificationKinds) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'put',
        url: '/api/notifications',
        headers: {
          token,
        },
        data: {
          notificationKinds,
        },
      });
      const { data } = res;
      const { notifications } = data;
      return { notifications };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
};

function* updateNotifications(action) {
  try {
    const { err, notifications } = yield call(Api.updateNotifications, action.payload);
    if (err) {
      yield put(updateNotificationsFailed({ message: err.message }));
    } else if (notifications) {
      yield put(updateNotificationsSucceeded({ notifications }));
    }
  } catch (e) {
    yield put(updateNotificationsFailed({ message: e.message }));
  }
}

function* watchUpdateNotifications() {
  yield takeEvery(updateNotificationsRequested.getType(), updateNotifications);
}

function* rootSaga() {
  yield all([fork(watchUpdateNotifications)]);
}

export default rootSaga;
