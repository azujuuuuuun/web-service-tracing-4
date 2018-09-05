import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const UserPage = (props) => {
  const {
    user, isViewer, hasFollowed, followRequest, unfollowRequest,
  } = props;
  return (
    <div>
      <GlobalHeader />
      {!user.username ? (
        <CircularProgress />
      ) : (
        <div>
          <h3>{`@${user.username}`}</h3>
          {!isViewer && (
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
