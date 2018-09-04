import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { postCommentRequested, postCommentSucceeded, postCommentFailed } from '../actions';

const Api = {
  postComment: async (text, itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { err: 'Token was not found.' };
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/comments',
        headers: {
          token,
        },
        data: {
          text,
          itemId,
        },
      });
      const { data } = res;
      const { comment } = data;
      return { comment };
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return { err };
    }
  },
};

function* postComment(action) {
  try {
    const { text, itemId } = action.payload;
    const { err, comment } = yield call(Api.postComment, text, itemId);
    if (err) {
      yield put(postCommentFailed({ message: err.message }));
    } else if (comment) {
      yield put(postCommentSucceeded({ comment }));
    }
  } catch (e) {
    yield put(postCommentFailed({ message: e.message }));
  }
}

function* watchPostComment() {
  yield takeEvery(postCommentRequested.getType(), postComment);
}

function* rootSaga() {
  yield all([fork(watchPostComment)]);
}

export default rootSaga;
