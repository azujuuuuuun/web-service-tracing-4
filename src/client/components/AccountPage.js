import React from 'react';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';
import SettingsMenu from './SettingsMenu';

const AccountPage = (props) => {
  const { viewer } = props;
  return (
    <div>
      <GlobalHeader />
      <SettingsMenu />
      <div>
        <div>
          <Link to={`/${viewer.username}`}>{viewer.username}</Link>
          <span>/</span>
          <span>アカウント</span>
        </div>
        <div>
          <div>アイコン</div>
          <img src={viewer.avatarImgSrc} alt="アバター" />
          <Link to="/settings/account/custom_image">
            画像アップロード
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
