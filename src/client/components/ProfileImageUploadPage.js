import React from 'react';
import { Link } from 'react-router-dom';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';

import GlobalHeader from '../containers/GlobalHeaderContainer';
import SettingsMenu from './SettingsMenu';

const ProfileImageUploadPage = (props) => {
  const { viewer, handleChangeFile, handleClickUploadImage } = props;
  return (
    <div>
      <GlobalHeader />
      <SettingsMenu />
      <div>
        <div>
          <Link to={`/${viewer.username}`}>{viewer.username}</Link>
          <span>/</span>
          <span>プロフィール画像アップロード</span>
        </div>
        <div>
          <div>
            {viewer.avatarImgSrc ? (
              <img src={viewer.avatarImgSrc} alt="アバター" />
            ) : (
              <ImageIcon />
            )}
            <div>
              <input
                type="file"
                name="avatar"
                onChange={handleChangeFile}
              />
              <span>10MBまで</span>
            </div>
          </div>
          <div>
            <Button onClick={handleClickUploadImage}>
              新しい画像をアップロードする
            </Button>
            <Link to="/settings/account">キャンセル</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploadPage;
