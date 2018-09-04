import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const ItemDetailPage = (props) => {
  const { item, handleClickLike, hasLiked } = props;
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
          <Tooltip title="いいね">
            <span>
              <Button
                onClick={() => handleClickLike(item.id)}
                disabled={hasLiked}
              >
                <ThumbUpIcon />
                <span>{item.likes.length}</span>
              </Button>
            </span>
          </Tooltip>
          <p>{item.body}</p>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
