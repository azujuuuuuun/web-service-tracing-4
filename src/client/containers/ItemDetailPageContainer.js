import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import ItemDetailPage from '../components/ItemDetailPage';
import { fetchItemRequested } from '../actions';

class ItemDetailPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { match, fetchItemRequest } = this.props;
    const { itemId } = match.params;
    fetchItemRequest(itemId);
  }

  render() {
    const { item } = this.props;
    return (
      <Loading>
        <ItemDetailPage item={item} />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
});

const mapDispatchToProps = dispatch => ({
  fetchItemRequest: itemId => dispatch(fetchItemRequested({ itemId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemDetailPageContainer);
