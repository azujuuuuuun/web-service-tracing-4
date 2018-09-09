import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const NotificationsSetting = (props) => {
  const {
    newsMail,
    stockListMail,
    editRequestMail,
    editRequestWeb,
    commentMail,
    commentWeb,
    mentionMail,
    mentionWeb,
    linkWeb,
    likeWeb,
    stockWeb,
    followMail,
    followWeb,
    twitterWeb,
    handleSubmit,
  } = props;
  return (
    <div>
      <div>
        <NotificationsIcon />
        <span>通知設定</span>
      </div>
      <div>
        <div>Qiitaからのお知らせ</div>
        <p>Qiitaからお知らせメールが届きます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!newsMail.input.value}
                onChange={newsMail.input.onChange}
                color="primary"
              />
            )}
            label="メール"
          />
        </FormGroup>
      </div>
      <div>
        <div>ストック一覧</div>
        <p>今週ストックした記事をまとめてお知らせします。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!stockListMail.input.value}
                onChange={stockListMail.input.onChange}
                color="primary"
              />
            )}
            label="メール"
          />
        </FormGroup>
      </div>
      <div>
        <div>編集リクエスト</div>
        <p>自分の投稿した記事に編集リクエストが送られたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!editRequestMail.input.value}
                onChange={editRequestMail.input.onChange}
                color="primary"
              />
            )}
            label="メール"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!editRequestWeb.input.value}
                onChange={editRequestWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <div>
        <div>コメント</div>
        <p>購読中の記事に新しくコメントが付いたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!commentMail.input.value}
                onChange={commentMail.input.onChange}
                color="primary"
              />
            )}
            label="メール"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!commentWeb.input.value}
                onChange={commentWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <div>
        <div>メンション</div>
        <p>自分が @mention されたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!mentionMail.input.value}
                onChange={mentionMail.input.onChange}
                color="primary"
              />
            )}
            label="メール"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!mentionWeb.input.value}
                onChange={mentionWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <div>
        <div>リンク</div>
        <p>自分の投稿した記事がリンクされたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!linkWeb.input.value}
                onChange={linkWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <div>
        <div>いいね</div>
        <p>自分の投稿した記事やコメントがいいねされたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!likeWeb.input.value}
                onChange={likeWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <div>
        <div>ストック</div>
        <p>自分の投稿した記事がストックされたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!stockWeb.input.value}
                onChange={stockWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <div>
        <div>フォロー</div>
        <p>自分がフォローされたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!followMail.input.value}
                onChange={followMail.input.onChange}
                color="primary"
              />
            )}
            label="メール"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!followWeb.input.value}
                onChange={followWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <div>
        <div>Twitter</div>
        <p>自分の投稿した記事がTwitterでつぶやかれたときに通知されます。</p>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={!!twitterWeb.input.value}
                onChange={twitterWeb.input.onChange}
                color="primary"
              />
            )}
            label="Web"
          />
        </FormGroup>
      </div>
      <Button onClick={handleSubmit}>
        保存する
      </Button>
    </div>
  );
};

export default NotificationsSetting;
