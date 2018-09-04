import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import GlobalHeader from '../containers/GlobalHeaderContainer';

const DraftNewPage = (props) => {
  const { title, body, handleSubmit } = props;
  return (
    <div>
      <GlobalHeader />
      <div>
        <div>
          <TextField
            value={title.input.value}
            onChange={title.input.onChange}
            placeholder="タイトル"
          />
        </div>
        <div>
          <TextField
            value={body.input.value}
            onChange={body.input.onChange}
            placeholder="プログラミング知識をMarkdown法で書いて共有しよう"
            multiline
            rows="18"
          />
        </div>
        <div>
          <Button onClick={handleSubmit}>
            Qiitaに投稿
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DraftNewPage;
