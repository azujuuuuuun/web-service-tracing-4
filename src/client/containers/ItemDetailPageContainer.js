import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import ItemDetailPage from '../components/ItemDetailPage';
import { fetchItemRequested, likeRequested } from '../actions';

class ItemDetailPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { match, fetchItemRequest } = this.props;
    const { itemId } = match.params;
    fetchItemRequest(itemId);
  }

  render() {
    const { item, likeRequest, viewer } = this.props;
    const hasLiked = item.likes.some(i => i.userId === viewer.id);
    return (
      <Loading>
        <ItemDetailPage
          item={item}
          handleClickLike={likeRequest}
          hasLiked={hasLiked}
        />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  viewer: state.viewer,
});

const mapDispatchToProps = dispatch => ({
  fetchItemRequest: itemId => dispatch(fetchItemRequested({ itemId })),
  likeRequest: itemId => dispatch(likeRequested({ itemId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemDetailPageContainer);
