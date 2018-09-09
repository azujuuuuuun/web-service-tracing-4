import React from 'react';
import { Link } from 'react-router-dom';

const SettingsMenu = () => (
  <div>
    <div>
      <Link to="/settings/profile">公開用プロフィール</Link>
    </div>
    <div>
      <Link to="/settings/account">アカウント</Link>
    </div>
    <div>
      <Link to="/settings/password">パスワード</Link>
    </div>
    <div>
      <Link to="/settings/notifications">メールアドレスと通知</Link>
    </div>
  </div>
);

export default SettingsMenu;
