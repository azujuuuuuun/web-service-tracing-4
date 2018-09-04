import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authenticateRequested } from '../actions';

class AuthContainer extends React.Component {
  componentDidMount() {
    const { authenticateRequest } = this.props;
    authenticateRequest();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  authenticateRequest: () => dispatch(authenticateRequested()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AuthContainer);
