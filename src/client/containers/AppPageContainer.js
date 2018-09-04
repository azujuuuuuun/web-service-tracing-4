import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import AppPage from '../components/AppPage';
import { fetchItemsRequested } from '../actions';

class AppPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { fetchItemsRequest } = this.props;
    fetchItemsRequest();
  }

  render() {
    const { items } = this.props;
    return (
      <Loading>
        <AppPage items={items} />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  fetchItemsRequest: () => dispatch(fetchItemsRequested()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppPageContainer);
