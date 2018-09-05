import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import UsersPage from '../components/UsersPage';
import { fetchUsersRequested } from '../actions';

class UsersPageContainer extends React.Component { // eslint-disable-line
  componentDidMount() {
    const { fetchUsersRequest } = this.props;
    fetchUsersRequest();
  }

  render() {
    const { users } = this.props;
    return (
      <Loading>
        <UsersPage users={users} />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchUsersRequest: () => dispatch(fetchUsersRequested()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPageContainer);
