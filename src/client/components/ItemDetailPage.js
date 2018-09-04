import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const ItemDetailPage = (props) => {
  const { item } = props;
  return (
    <div>
      <GlobalHeader />
      {!item.user ? (
        <CircularProgress />
      ) : (
        <div>
          <div>
            <Link to={`/${item.user.username}`}>
              {`@${item.user.username}`}
            </Link>
            <span>{item.updatedAt}</span>
          </div>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
