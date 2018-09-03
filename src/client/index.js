import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import mySaga from './sagas';
import Root from './components/Root';

const logger = createLogger({
  collapsed: true,
});

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(mySaga);

hydrate(
  <Root store={store} />,
  document.getElementById('root'),
);
