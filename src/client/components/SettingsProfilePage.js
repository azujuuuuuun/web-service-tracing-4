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
    firstName,
    lastName,
    web,
    organization,
    location,
    description,
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
            <span>公開用プロフィール</span>
          </div>
        </div>
        <div>
          <div>名前</div>
          <TextField
            value={firstName.input.value}
            onChange={firstName.input.onChange}
            placeholder="名"
          />
          <TextField
            value={lastName.input.value}
            onChange={lastName.input.onChange}
            placeholder="姓"
          />
        </div>
        <div>
          <div>サイト/ブログ</div>
          <TextField
            value={web.input.value}
            onChange={web.input.onChange}
          />
        </div>
        <div>
          <div>所属している組織・会社</div>
          <TextField
            value={organization.input.value}
            onChange={organization.input.onChange}
          />
        </div>
        <div>
          <div>居住地</div>
          <TextField
            value={location.input.value}
            onChange={location.input.onChange}
          />
        </div>
        <div>
          <div>自己紹介</div>
          <TextField
            value={description.input.value}
            onChange={description.input.onChange}
            multiline
            rows="4"
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
