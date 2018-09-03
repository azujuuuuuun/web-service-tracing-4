import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

class LoadingContainer extends React.Component { // eslint-disable-line
  render() {
    const { loading, children } = this.props;
    return loading ? (
      <LinearProgress />
    ) : (
      children
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(
  mapStateToProps,
)(LoadingContainer);
