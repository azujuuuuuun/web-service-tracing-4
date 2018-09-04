import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AppPage from './AppPageContainer';
import DraftNewPage from './DraftNewPageContainer';
import ItemDetailPage from './ItemDetailPageContainer';
import IndexPage from './IndexPageContainer';
import SignupPage from './SignupPageContainer';
import LoginPage from './LoginPageContainer';

class RoutingContainer extends React.Component { // eslint-disable-line
  render() {
    const { isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Switch>
        <Route exact path="/" component={AppPage} />
        <Route path="/drafts/new" component={DraftNewPage} />
        <Route path="/:username/items/:itemId" component={ItemDetailPage} />
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

export default compose(
  withRouter,
  connect(mapStateToProps),
)(RoutingContainer);
