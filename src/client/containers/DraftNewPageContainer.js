import React from 'react';
import { Fields, reduxForm } from 'redux-form';

import Loading from './LoadingContainer';
import DraftNewPage from '../components/DraftNewPage';
import { postItemRequested } from '../actions';

class DraftNewPageContainer extends React.Component { // eslint-disable-line
  render() {
    const { handleSubmit } = this.props;
    return (
      <Loading>
        <Fields
          names={['title', 'body']}
          component={DraftNewPage}
          handleSubmit={handleSubmit}
        />
      </Loading>
    );
  }
}

const onSubmit = (values, dispatch) => {
  const { title, body } = values;
  dispatch(postItemRequested({ title, body }));
};

export default reduxForm({
  form: 'item',
  onSubmit,
})(DraftNewPageContainer);
