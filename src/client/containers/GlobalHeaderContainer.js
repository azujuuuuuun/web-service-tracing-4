import React from 'react';
import { connect } from 'react-redux';

import GlobalHeader from '../components/GlobalHeader';
import { openDropdown, closeDropdown } from '../actions';

class GlobalHeaderContainer extends React.Component { // eslint-disable-line
  render() {
    const {
      viewer,
      dropdown,
      openViewerDropdown,
      closeViewerDropdown,
    } = this.props;
    return (
      <GlobalHeader
        viewer={viewer}
        dropdown={dropdown}
        openViewerDropdown={openViewerDropdown}
        closeViewerDropdown={closeViewerDropdown}
      />
    );
  }
}

const mapStateToProps = state => ({
  viewer: state.viewer,
  dropdown: state.dropdown,
});

const mapDispatchToProps = dispatch => ({
  openViewerDropdown: () => dispatch(openDropdown({ kind: 'viewer' })),
  closeViewerDropdown: () => dispatch(closeDropdown()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalHeaderContainer);
