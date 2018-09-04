import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import UserPage from '../components/UserPage';
import { fetchUserRequested } from '../actions';

class UserPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { match, fetchUserRequest } = this.props;
    const { username } = match.params;
    fetchUserRequest(username);
  }

  render() {
    const { user } = this.props;
    return (
      <Loading>
        <UserPage user={user} />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUserRequest: username => dispatch(fetchUserRequested({ username })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPageContainer);
