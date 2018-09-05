import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  stockRequested, stockSucceeded, stockFailed,
  unstockRequested, unstockSucceeded, unstockFailed,
} from '../actions';

const Api = {
  stock: async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/stocks',
        headers: {
          token,
        },
        data: {
          itemId,
        },
      });
      const { data } = res;
      return { data: data.stock };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  unstock: async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      await axios({
        method: 'delete',
        url: `/stocks/${itemId}`,
        headers: {
          token,
        },
      });
      return { data: 'Deleteing stock succeeded' };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
};

function* stock(action) {
  try {
    const { item } = action.payload;
    const { err, data } = yield call(Api.stock, item.id);
    if (err) {
      yield put(stockFailed({ message: err.message }));
    } else if (data) {
      yield put(stockSucceeded({ item }));
    }
  } catch (e) {
    yield put(stockFailed({ message: e.message }));
  }
}

function* unstock(action) {
  try {
    const { itemId } = action.payload;
    const { err, data } = yield call(Api.unstock, itemId);
    if (err) {
      yield put(unstockFailed({ message: err.message }));
    } else if (data) {
      yield put(unstockSucceeded({ itemId }));
    }
  } catch (e) {
    yield put(unstockFailed({ message: e.message }));
  }
}

function* watchStock() {
  yield takeEvery(stockRequested.getType(), stock);
}

function* watchUnstock() {
  yield takeEvery(unstockRequested.getType(), unstock);
}

function* rootSaga() {
  yield all([
    fork(watchStock),
    fork(watchUnstock),
  ]);
}

export default rootSaga;
