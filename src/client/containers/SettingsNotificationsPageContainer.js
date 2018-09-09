import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import SettingsNotificationsPage from '../components/SettingsNotificationsPage';

class SettingsNotificationsPageContainer extends React.Component { // eslint-disable-line
  render() {
    const { viewer } = this.props;
    return (
      <Loading>
        <SettingsNotificationsPage viewer={viewer} />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
});

export default connect(
  mapStateToProps,
)(SettingsNotificationsPageContainer);
