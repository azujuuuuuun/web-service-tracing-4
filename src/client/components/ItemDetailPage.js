import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import TextField from '@material-ui/core/TextField';

import GlobalHeader from '../containers/GlobalHeaderContainer';
import NotFound from './NotFound';

const ItemDetailPage = (props) => {
  const {
    item,
    hasLiked,
    handleClickLike,
    handleClickUnlike,
    hasStocked,
    handleClickStock,
    handleClickUnstock,
    text,
    handleSubmit,
  } = props;
  return (
    <div>
      <GlobalHeader />
      {!item.user ? (
        <NotFound />
      ) : (
        <div>
          <div>
            <div>
              <Avatar src={item.user.avatarImgSrc} alt="アバター">
                {item.user.username}
              </Avatar>
              <Link to={`/${item.user.username}`}>
                {`@${item.user.username}`}
              </Link>
              <span>{item.updatedAt}</span>
            </div>
            <h1>{item.title}</h1>
            <div>
              {item.tags.map(t => (
                <Chip key={t.id} label={t.name} />
              ))}
            </div>
            {!hasLiked ? (
              <Tooltip title="いいね">
                <span>
                  <Button
                    onClick={() => handleClickLike(item)}
                    disabled={hasLiked}
                  >
                    <ThumbUpIcon />
                    <span>{item.likers.length}</span>
                  </Button>
                </span>
              </Tooltip>
            ) : (
              <Tooltip title="いいね済み">
                <span>
                  <Button
                    onClick={() => handleClickUnlike(item.id)}
                    disabled={!hasLiked}
                  >
                    <CheckIcon />
                    <span>{item.likers.length}</span>
                  </Button>
                </span>
              </Tooltip>
            )}
            {!hasStocked ? (
              <Tooltip title="ストック">
                <span>
                  <IconButton
                    onClick={() => handleClickStock(item)}
                    disabled={hasStocked}
                  >
                    <BookmarkBorderIcon />
                  </IconButton>
                </span>
              </Tooltip>
            ) : (
              <Tooltip title="ストック済み">
                <span>
                  <IconButton
                    onClick={() => handleClickUnstock(item.id)}
                    disabled={!hasStocked}
                  >
                    <BookmarkIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            <p>{item.body}</p>
          </div>
          <div>
            <div>
              {item.comments.map(c => (
                <div key={c.id}>
                  <div>
                    <Avatar src={c.user.avatarImgSrc} alt="アバター">
                      {c.user.username}
                    </Avatar>
                    <div>
                      <span>{c.user.username}</span>
                    </div>
                    <div>
                      <span>{c.createdAt}</span>
                    </div>
                  </div>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            <div>
              <div>コメントを投稿する</div>
              <TextField
                value={text.input.value}
                onChange={text.input.onChange}
                placeholder="コメントを入力してください"
                multiline
                rows="4"
              />
              <Button onClick={handleSubmit}>投稿</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
