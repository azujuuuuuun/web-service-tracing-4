import React from 'react';
import { Fields, reduxForm } from 'redux-form';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import SettingProfilePage from '../components/SettingsPasswordPage';
import { updatePasswordRequested } from '../actions';

class SettingsPasswordContainer extends React.Component { // eslint-disable-line
  render() {
    const { viewer, handleSubmit } = this.props;
    return (
      <Loading>
        <Fields
          names={[
            'currentPassword',
            'newPassword',
          ]}
          component={SettingProfilePage}
          viewer={viewer}
          handleSubmit={handleSubmit}
        />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
});

const onSubmit = (values, dispatch) => {
  const { currentPassword, newPassword } = values;
  const currentHashDigest = Base64.stringify(sha256(currentPassword));
  const newHashDigest = Base64.stringify(sha256(newPassword));
  dispatch(updatePasswordRequested({
    currentPassword: currentHashDigest, newPassword: newHashDigest,
  }));
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'password',
    onSubmit,
  }),
)(SettingsPasswordContainer);
