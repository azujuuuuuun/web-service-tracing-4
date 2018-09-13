import { createReducer } from 'redux-act';

import {
  signupSucceeded,
  loginSucceeded,
  logoutSucceeded,
  authenticateSucceeded,
  followRequested,
  unfollowRequested,
  likeSucceeded,
  unlikeSucceeded,
  stockSucceeded,
  unstockSucceeded,
  followTagSucceeded,
  unfollowTagSucceeded,
  updateNotificationsSucceeded,
  uploadImageSucceeded,
} from '../actions';

const defaultState = {
  isLoggedIn: false,
  followings: [],
  likes: [],
  stocks: [],
  followingTags: [],
  notifications: [],
};

const viewer = createReducer({
  [signupSucceeded]: (state, payload) => Object.assign({}, state, {
    isLoggedIn: true,
    ...payload.user,
  }),
  [loginSucceeded]: (state, payload) => Object.assign({}, state, {
    isLoggedIn: true,
    ...payload.user,
  }),
  [logoutSucceeded]: () => ({ isLoggedIn: false }),
  [authenticateSucceeded]: (state, payload) => Object.assign({}, state, {
    isLoggedIn: true,
    ...payload.user,
  }),
  [likeSucceeded]: (state, payload) => Object.assign({}, state, {
    likes: [
      payload.item,
      ...state.likes,
    ],
  }),
  [unlikeSucceeded]: (state, payload) => Object.assign({}, state, {
    likes: state.likes.filter(i => i.id !== payload.itemId),
  }),
  [stockSucceeded]: (state, payload) => Object.assign({}, state, {
    stocks: [
      payload.item,
      ...state.stocks,
    ],
  }),
  [unstockSucceeded]: (state, payload) => Object.assign({}, state, {
    stocks: state.stocks.filter(i => i.id !== payload.itemId),
  }),
  [followRequested]: (state, payload) => Object.assign({}, state, {
    followings: [
      payload.user,
      ...state.followings,
    ],
  }),
  [unfollowRequested]: (state, payload) => Object.assign({}, state, {
    followings: state.followings.filter(f => f.id !== payload.followedId),
  }),
  [followTagSucceeded]: (state, payload) => Object.assign({}, state, {
    followingTags: [
      payload.tag,
      ...state.followingTags,
    ],
  }),
  [unfollowTagSucceeded]: (state, payload) => Object.assign({}, state, {
    followingTags: state.followingTags.filter(t => t.id !== payload.tagId),
  }),
  [updateNotificationsSucceeded]: (state, payload) => Object.assign({}, state, {
    notifications: payload.notifications,
  }),
  [uploadImageSucceeded]: (state, payload) => Object.assign({}, state, {
    avatarImgSrc: payload.avatarImgSrc,
  }),
}, defaultState);

export default viewer;
