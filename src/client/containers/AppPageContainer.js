import React from 'react';

import Loading from './LoadingContainer';
import AppPage from '../components/AppPage';

class AppPageContainer extends React.Component { // eslint-disable-line
  render() {
    return (
      <Loading>
        <AppPage />
      </Loading>
    );
  }
}

export default AppPageContainer;
