import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import rootReducer from '../client/reducers';
import Auth from '../client/containers/AuthContainer';
import Routing from '../client/containers/RoutingContainer';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const tagsRouter = require('./routes/tags');
const notificationsRouter = require('./routes/notifications');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/dist', express.static(path.resolve(__dirname, '../../dist')));
app.use('/public', express.static(path.resolve(__dirname, '../../public')));
app.use('/public/images', express.static(path.resolve(__dirname, '../../uploads')));

app.use('/', authRouter);
app.use('/upload', uploadRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/notifications', notificationsRouter);

const renderFullPage = (html, preloadedState) => (
  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>web-service-tracing-4</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="/public/css/style.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/dist/client.js"></script>
      </body>
    </html>
    `
);

const handleRender = (req, res) => {
  const store = createStore(rootReducer);
  const context = {};
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <Auth>
          <Routing />
        </Auth>
      </StaticRouter>
    </Provider>,
  );
  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
};

app.use(handleRender);

app.listen(3000, () => {
  console.log('web-service-tracing-template listening on port 3000!'); // eslint-disable-line no-console
});
