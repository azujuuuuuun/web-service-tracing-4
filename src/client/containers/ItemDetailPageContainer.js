import React from 'react';
import { connect } from 'react-redux';
import { Fields, reduxForm } from 'redux-form';
import { compose } from 'redux';

import Loading from './LoadingContainer';
import ItemDetailPage from '../components/ItemDetailPage';
// eslint-disable-next-line
import {
  fetchItemRequested,
  likeRequested,
  unlikeRequested,
  stockRequested,
  unstockRequested,
  postCommentRequested,
} from '../actions';

class ItemDetailPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { match, fetchItemRequest } = this.props;
    const { itemId } = match.params;
    fetchItemRequest(itemId);
  }

  handleClickLike = (item) => {
    const { likeRequest, viewer } = this.props;
    likeRequest(item, viewer);
  }

  handleClickUnlike = (itemId) => {
    const { unlikeRequest, viewer } = this.props;
    unlikeRequest(itemId, viewer.id);
  }

  render() {
    const {
      item,
      stockRequest,
      unstockRequest,
      viewer,
      handleSubmit,
    } = this.props;
    const hasLiked = viewer.likes.some(i => i.id === item.id);
    const hasStocked = viewer.stocks.some(i => i.id === item.id);
    return (
      <Loading>
        <Fields
          names={['text']}
          component={ItemDetailPage}
          item={item}
          hasLiked={hasLiked}
          handleClickLike={this.handleClickLike}
          handleClickUnlike={this.handleClickUnlike}
          hasStocked={hasStocked}
          handleClickStock={stockRequest}
          handleClickUnstock={unstockRequest}
          handleSubmit={handleSubmit}
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
  likeRequest: (item, user) => dispatch(likeRequested({
    item, user,
  })),
  unlikeRequest: (itemId, userId) => dispatch(unlikeRequested({
    itemId, userId,
  })),
  stockRequest: item => dispatch(stockRequested({ item })),
  unstockRequest: itemId => dispatch(unstockRequested({ itemId })),
});

const onSubmit = (values, dispatch, props) => {
  const { text } = values;
  const { itemId } = props.match.params;
  dispatch(postCommentRequested({ text, itemId }));
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'comment',
    onSubmit,
  }),
)(ItemDetailPageContainer);
