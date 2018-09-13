import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const UsersPage = (props) => {
  const { users } = props;
  return (
    <div>
      <GlobalHeader />
      <div>
        <h2>
          <PeopleIcon />
          <span>ユーザー一覧</span>
        </h2>
        <p>Qiitaに登録しているユーザーの一覧です。 現在1万人以上のユーザーが登録しています。</p>
      </div>
      <div>
        {users.map(u => (
          <div key={u.id}>
            <Avatar src={u.avatarImgSrc} alt="アバター">{u.username}</Avatar>
            <div>
              <Link to={`/${u.username}`}>{u.username}</Link>
            </div>
            <p>{u.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
