import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import UserPage from '../components/UserPage';
import {
  fetchUserRequested, followRequested, unfollowRequested,
} from '../actions';

class UserPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { match, fetchUserRequest } = this.props;
    const { username } = match.params;
    fetchUserRequest(username);
  }

  render() {
    const {
      viewer, user, followRequest, unfollowRequest,
    } = this.props;
    const isViewer = viewer.id === user.id;
    const hasFollowed = viewer.followings.some(f => f.id === user.id);
    return (
      <Loading>
        <UserPage
          user={user}
          isViewer={isViewer}
          hasFollowed={hasFollowed}
          followRequest={followRequest}
          unfollowRequest={unfollowRequest}
        />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUserRequest: username => dispatch(fetchUserRequested({ username })),
  followRequest: user => dispatch(followRequested({ user })),
  unfollowRequest: followedId => dispatch(unfollowRequested({ followedId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPageContainer);
