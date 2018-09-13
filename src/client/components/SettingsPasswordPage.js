import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import GlobalHeader from '../containers/GlobalHeaderContainer';
import SettingsMenu from './SettingsMenu';

const SettingsProfilePage = (props) => {
  const {
    viewer,
    currentPassword,
    newPassword,
    handleSubmit,
  } = props;
  return (
    <div>
      <GlobalHeader />
      <SettingsMenu />
      <div>
        <div>
          <div>
            <Avatar src={viewer.avatarImgSrc}>
              {viewer.username}
            </Avatar>
            <Link to={`/${viewer.username}`}>
              {viewer.username}アカウント
            </Link>
          </div>
          <div>
            <span>パスワード</span>
          </div>
        </div>
        <div>
          <div>現在のパスワード</div>
          <TextField
            value={currentPassword.input.value}
            onChange={currentPassword.input.onChange}
          />
        </div>
        <div>
          <div>新しいパスワード</div>
          <TextField
            value={newPassword.input.value}
            onChange={newPassword.input.onChange}
          />
        </div>
        <div>
          <Button onClick={handleSubmit}>
            更新する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfilePage;
