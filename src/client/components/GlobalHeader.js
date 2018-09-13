import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PeopleIcon from '@material-ui/icons/People';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const GlobalHeader = (props) => {
  const {
    viewer,
    dropdown,
    openCommunityDropdown,
    openViewerDropdown,
    closeDropdown,
  } = props;
  return (
    <div className="header">
      <AppBar>
        <Toolbar posithin="static">
          <Link to="/">Qiita</Link>
          <span>コミュニティ</span>
          <IconButton onClick={openCommunityDropdown}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            open={dropdown.isOpen && dropdown.kind === 'community'}
            onClose={closeDropdown}
          >
            <MenuItem>
              <Link to="/users" onClick={closeDropdown}>
                <PeopleIcon />
                <span>ユーザー一覧</span>
              </Link>
            </MenuItem>
          </Menu>
          <Link to="/stock">
            <FolderOpenIcon />
            <span>ストック一覧</span>
          </Link>
          <Link to="/drafts/new">投稿する</Link>
          <Avatar src={viewer.avatarImgSrc} alt="アバター">
            {viewer.username}
          </Avatar>
          <IconButton onClick={openViewerDropdown}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            open={dropdown.isOpen && dropdown.kind === 'viewer'}
            onClose={closeDropdown}
          >
            <MenuItem>
              <Link to={`/${viewer.username}`} onClick={closeDropdown}>
                マイページ
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default GlobalHeader;
