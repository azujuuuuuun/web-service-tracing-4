import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const UserPage = (props) => {
  const { user } = props;
  return (
    <div>
      <GlobalHeader />
      {!user.username ? (
        <CircularProgress />
      ) : (
        <div>
          <h3>{`@${user.username}`}</h3>
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
