import React from 'react';
import { connect } from 'react-redux';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthContainer);
