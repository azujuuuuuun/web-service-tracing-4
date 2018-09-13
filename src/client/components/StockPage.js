import React from 'react';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const StockPage = (props) => {
  const { stocks } = props;
  return (
    <div>
      <GlobalHeader />
      <div>
        <h2>
          <FolderOpenIcon />
          <span>ストック一覧</span>
        </h2>
      </div>
      <div>
        {stocks.map(i => (
          (i.user && i.likers && i.comments) ? (
            <div key={i.id}>
              <div>
                <Avatar src={i.user.avatarImgSrc} alt="アバター">
                  {i.user.username}
                </Avatar>
              </div>
              <div>
                <div>
                  <span>
                    <Link to={`/${i.user.username}`}>
                      {i.user.username}
                    </Link>
                    が{i.createdAt}に投稿
                  </span>
                </div>
                <div>
                  <Link to={`/${i.user.username}/items/${i.id}`}>
                    {i.title}
                  </Link>
                </div>
              </div>
              <div>
                <div>
                  <ThumbUpIcon />
                  <span>{i.likers.length}</span>
                </div>
                <div>
                  <ChatBubbleOutline />
                  <span>{i.comments.length}</span>
                </div>
              </div>
            </div>
          ) : (
            <CircularProgress />
          )
        ))}
      </div>
    </div>
  );
};

export default StockPage;
