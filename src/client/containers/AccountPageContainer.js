import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import AccountPage from '../components/AccountPage';

class AccountPageContainer extends React.Component { // eslint-disable-line
  render() {
    const { viewer } = this.props;
    return (
      <Loading>
        <AccountPage viewer={viewer} />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
});

export default connect(
  mapStateToProps,
)(AccountPageContainer);
