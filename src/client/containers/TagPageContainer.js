import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import TagPage from '../components/TagPage';
import {
  fetchTagRequested, followTagRequested, unfollowTagRequested,
} from '../actions';

class TagPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { match, fetchTagRequest } = this.props;
    const { tagName } = match.params;
    fetchTagRequest(tagName);
  }

  handleClickFollow = (tag) => {
    const { followTagRequest, viewer } = this.props;
    followTagRequest(tag, viewer);
  }

  handleClickUnfollow = (tagId) => {
    const { unfollowTagRequest, viewer } = this.props;
    unfollowTagRequest(tagId, viewer.id);
  }

  render() {
    const { viewer, tag } = this.props;
    const hasFollowed = viewer.followingTags.some(t => t.id === tag.id);
    return (
      <Loading>
        <TagPage
          tag={tag}
          hasFollowed={hasFollowed}
          handleClickFollow={this.handleClickFollow}
          handleClickUnfollow={this.handleClickUnfollow}
        />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
  tag: state.tag,
});

const mapDispatchToProps = dispatch => ({
  fetchTagRequest: tagName => dispatch(fetchTagRequested({ tagName })),
  followTagRequest: (tag, user) => dispatch(followTagRequested({
    tag, user,
  })),
  unfollowTagRequest: (tagId, userId) => dispatch(unfollowTagRequested({
    tagId, userId,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagPageContainer);
