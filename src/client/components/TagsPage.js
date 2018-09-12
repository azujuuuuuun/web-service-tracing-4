import React from 'react';
import { Link } from 'react-router-dom';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const TagsPage = (props) => {
  const { tags } = props;
  return (
    <div>
      <GlobalHeader />
      <div>
        <h1>タグ一覧</h1>
        <div>
          {tags.map(t => (
            <li key={t.id}>
              <Link to={`/tags/${t.name}`}>
                <span>{t.name}</span>
                <span>{t.followers.length}</span>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
