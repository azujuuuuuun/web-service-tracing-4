import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const AppPage = (props) => {
  const { items } = props;
  return (
    <div>
      <GlobalHeader />
      <div>
        {items.map(i => (
          <div key={i.id}>
            <Avatar src={i.user.avatarImgSrc}>
              {i.user.username}
            </Avatar>
            <div>
              <Link to={`/${i.user.username}/items/${i.id}`}>
                {i.title}
              </Link>
            </div>
            <div>
              <span>{i.user.username}</span>
              <span>{i.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPage;
