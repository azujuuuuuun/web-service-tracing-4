import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  postItemRequested, postItemSucceeded, postItemFailed,
  fetchItemRequested, fetchItemSucceeded, fetchItemFailed,
  fetchItemsRequested, fetchItemsSucceeded, fetchItemsFailed,
  likeRequested, likeSucceeded, likeFailed,
  unlikeRequested, unlikeSucceeded, unlikeFailed,
} from '../actions';
import history from '../history';

const Api = {
  postItem: async (title, tagNames, body) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/items',
        headers: {
          token,
        },
        data: {
          title,
          tagNames,
          body,
        },
      });
      const { data } = res;
      const { item } = data;
      return { item };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  fetchItem: async (itemId) => {
    try {
      const res = await axios({
        method: 'get',
        url: `/items/${itemId}`,
      });
      const { data } = res;
      const { item } = data;
      return { item };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  fetchItems: async () => {
    try {
      const res = await axios({
        method: 'get',
        url: '/items',
      });
      const { data } = res;
      const { items } = data;
      return { items };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
  like: async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: `/api/items/${itemId}/like`,
        headers: {
          token,
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
        url: `/api/items/${itemId}/unlike`,
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

function* postItem(action) {
  try {
    const { title, tagNames, body } = action.payload;
    const { err, item } = yield call(Api.postItem, title, tagNames, body);
    if (err) {
      yield put(postItemFailed({ message: err.message }));
    } else if (item) {
      yield call(history.push, `/${item.user.username}/items/${item.id}`);
      yield put(postItemSucceeded({ item }));
    }
  } catch (e) {
    yield put(postItemFailed({ message: e.message }));
  }
}

function* fetchItem(action) {
  try {
    const { err, item } = yield call(Api.fetchItem, action.payload.itemId);
    if (err) {
      yield put(fetchItemFailed({ message: err.message }));
    } else if (item) {
      yield put(fetchItemSucceeded({ item }));
    }
  } catch (e) {
    yield put(fetchItemFailed({ message: e.message }));
  }
}

function* fetchItems() {
  try {
    const { err, items } = yield call(Api.fetchItems);
    if (err) {
      yield put(fetchItemsFailed({ message: err.message }));
    } else if (items) {
      yield put(fetchItemsSucceeded({ items }));
    }
  } catch (e) {
    yield put(fetchItemsFailed({ message: e.message }));
  }
}

function* like(action) {
  try {
    const { item, user } = action.payload;
    const { err, data } = yield call(Api.like, item.id);
    if (err) {
      yield put(likeFailed({ message: err.message }));
    } else if (data) {
      yield put(likeSucceeded({ item, user }));
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

function* watchPostItem() {
  yield takeEvery(postItemRequested.getType(), postItem);
}

function* watchFetchItem() {
  yield takeEvery(fetchItemRequested.getType(), fetchItem);
}

function* watchFetchItems() {
  yield takeEvery(fetchItemsRequested.getType(), fetchItems);
}

function* watchLike() {
  yield takeEvery(likeRequested.getType(), like);
}

function* watchUnlike() {
  yield takeEvery(unlikeRequested.getType(), unlike);
}

function* rootSaga() {
  yield all([
    fork(watchPostItem),
    fork(watchFetchItem),
    fork(watchFetchItems),
    fork(watchLike),
    fork(watchUnlike),
  ]);
}

export default rootSaga;
