import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';
import SettingsMenu from './SettingsMenu';
import EmailSetting from '../containers/EmailSettingContainer';
import NotificationsSetting from '../containers/NotificationsSettingContainer';

const SettingsNotificationsPage = (props) => {
  const { viewer } = props;
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
            <span>メールアドレスと通知</span>
          </div>
          <EmailSetting />
          <NotificationsSetting viewer={viewer} />
        </div>
      </div>
    </div>
  );
};

export default SettingsNotificationsPage;
