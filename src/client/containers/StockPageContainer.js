import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import StockPage from '../components/StockPage';

class StockPageContainer extends React.Component { // eslint-disable-line
  render() {
    const { viewer } = this.props;
    const { stocks } = viewer;
    return (
      <Loading>
        <StockPage stocks={stocks} />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
});

export default connect(
  mapStateToProps,
)(StockPageContainer);
