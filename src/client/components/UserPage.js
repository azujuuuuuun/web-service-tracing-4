import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';
import NotFound from './NotFound';

const UserPage = (props) => {
  const {
    user, isViewer, hasFollowed, followRequest, unfollowRequest,
  } = props;
  return (
    <div>
      <GlobalHeader />
      {!user.username ? (
        <NotFound />
      ) : (
        <div>
          <h3>{`@${user.username}`}</h3>
          {isViewer ? (
            <Link to="/settings/profile">
              <SettingsIcon />
              <span>プロフィールを編集する</span>
            </Link>
          ) : (
            <div>
              <Button
                onClick={() => followRequest(user)}
                disabled={hasFollowed}
              >
                フォロー
              </Button>
              <Button disabled={!hasFollowed}>
                フォロー中
              </Button>
              <Button
                onClick={() => unfollowRequest(user.id)}
                disabled={!hasFollowed}
              >
                解除
              </Button>
            </div>
          )}
          <div>
            {user.items.map(i => (
              <div key={i.id}>
                <div>
                  <Link to={`/${i.user.username}`}>
                    {i.user.username}
                  </Link>
                  が{i.updatedAt}に投稿
                </div>
                <div>
                  <Link to={`/${i.user.username}/items/${i.id}`}>
                    {i.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
