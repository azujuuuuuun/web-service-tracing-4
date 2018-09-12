import React from 'react';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LabelIcon from '@material-ui/icons/Label';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';
import NotFound from './NotFound';

const TagPage = (props) => {
  const {
    tag, hasFollowed, handleClickFollow, handleClickUnfollow,
  } = props;
  return (
    <div>
      <GlobalHeader />
      {!tag ? (
        <NotFound />
      ) : (
        <div>
          <div>
            <div>
              <span>{tag.name}</span>
            </div>
            <div>
              <div>
                <span>{tag.items.length}</span>
                <span>投稿</span>
              </div>
              <div>
                <span>{tag.followers.length}</span>
                <span>フォロワー</span>
              </div>
            </div>
            {hasFollowed ? (
              <div>
                <Button>フォロー中</Button>
                <Button
                  onClick={() => handleClickUnfollow(tag.id)}
                >
                  解除
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => handleClickFollow(tag)}
                >
                  フォロー
                </Button>
              </div>
            )}
          </div>
          <div>
            {tag.items.map(i => (
              <div key={i.id}>
                <div>{i.title}</div>
                <div>
                  <div>
                    <span>by</span>
                    <Link to={`/${i.user.username}`}>
                      {i.user.username}
                    </Link>
                  </div>
                  <div>
                    <ThumbUpIcon />
                    <span>{i.likers.length}</span>
                  </div>
                  <div>
                    <LabelIcon />
                    {i.tags.map(t => (
                      <Link key={t.id} to={`/tags/${t.name}`}>
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagPage;
