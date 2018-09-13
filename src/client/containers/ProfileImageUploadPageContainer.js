import React from 'react';
import { connect } from 'react-redux';

import Loading from './LoadingContainer';
import ProfileImageUploadPage from '../components/ProfileImageUploadPage';
import { uploadImageRequested } from '../actions';

class ProfileImageUploadPageContainer extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { file: undefined };
  }

  handleChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  handleClickUploadImage = () => {
    const { uploadImageRequest } = this.props;
    const { file } = this.state;
    const formData = new FormData();
    formData.append('avatar', file);
    uploadImageRequest(formData);
  }

  render() {
    const { viewer } = this.props;
    return (
      <Loading>
        <ProfileImageUploadPage
          viewer={viewer}
          handleChangeFile={this.handleChangeFile}
          handleClickUploadImage={this.handleClickUploadImage}
        />
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
});

const mapDispatchToProps = dispatch => ({
  uploadImageRequest: image => dispatch(uploadImageRequested({ image })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileImageUploadPageContainer);
