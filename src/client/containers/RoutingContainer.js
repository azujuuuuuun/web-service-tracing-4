import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppPage from './AppPageContainer';
import IndexPage from './IndexPageContainer';
import SignupPage from './SignupPageContainer';
import LoginPage from './LoginPageContainer';

class RoutingContainer extends React.Component { // eslint-disable-line
  render() {
    const { isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Switch>
        <Route exact path="/" component={AppPage} />
      </Switch>
    ) : (
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.viewer.isLoggedIn,
});

export default connect(
  mapStateToProps,
)(RoutingContainer);
