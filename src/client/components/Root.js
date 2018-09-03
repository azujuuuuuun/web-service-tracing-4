import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import history from '../history';
import Auth from '../containers/AuthContainer';
import Routing from '../containers/RoutingContainer';

const Root = (props) => {
  const { store } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <Auth>
          <Routing />
        </Auth>
      </Router>
    </Provider>
  );
};

export default Root;
