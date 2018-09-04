import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const GlobalHeader = (props) => {
  const {
    viewer,
    dropdown,
    openViewerDropdown,
    closeViewerDropdown,
  } = props;
  return (
    <div>
      <Link to="/">Qiita</Link>
      <Link to="/drafts/new">投稿する</Link>
      <Avatar>{viewer.username}</Avatar>
      <IconButton onClick={openViewerDropdown}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        open={dropdown.isOpen}
        onClose={closeViewerDropdown}
      >
        <MenuItem>
          <Link to={`/${viewer.username}`}>マイページ</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default GlobalHeader;
