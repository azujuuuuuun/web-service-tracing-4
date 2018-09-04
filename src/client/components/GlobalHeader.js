import React from 'react';
import { Link } from 'react-router-dom';

const GlobalHeader = () => (
  <div>
    <Link to="/">Qiita</Link>
    <Link to="/drafts/new">投稿する</Link>
  </div>
);

export default GlobalHeader;
