import React from 'react';
import { Fields, reduxForm } from 'redux-form';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

import Loading from './LoadingContainer';
import LoginPage from '../components/LoginPage';
import { loginRequested } from '../actions';

class LoginPageContainer extends React.Component { // eslint-disable-line
  render() {
    const { handleSubmit } = this.props;
    return (
      <Loading>
        <Fields
          names={['username', 'password']}
          component={LoginPage}
          handleSubmit={handleSubmit}
        />
      </Loading>
    );
  }
}

const onSubmit = (values, dispatch) => {
  const { username, password } = values;
  const hashDigest = Base64.stringify(sha256(password));
  dispatch(loginRequested({ username, password: hashDigest }));
};

export default reduxForm({
  form: 'login',
  onSubmit,
})(LoginPageContainer);
