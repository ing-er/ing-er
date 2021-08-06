import clsx from 'clsx';

import RoomClose from '../../buttons/RoomClose';
import RoomPause from '../../buttons/RoomPause';

import { Link } from 'react-router-dom';

import { IconButton } from '@material-ui/core';

import { ChevronLeft } from '@material-ui/icons';

import { Wrapper, useDrawerStyles } from './styles';

const RoomAppbar = ({ handleDrawerOpen, leaveSession, handleVideoMute, open, classes }) => {
  const drawerClasses = useDrawerStyles();

  const handleLeaveSession = (e) => {
    leaveSession()
  }


  return (
    <Wrapper>
      <div className={clsx(drawerClasses.content, {
        [drawerClasses.contentShift]: open,
      })}>
        <IconButton
          onClick={handleVideoMute}
          className="room-buttons-container"
        >
          <RoomPause className="room-pause" />
        </IconButton>
        <Link
          // to='/Main'
          to="/TESTBUTTON" // tmp link
          onClick={handleLeaveSession}
        >
          <IconButton 
            className="room-buttons-container"
            onClick={handleLeaveSession}
            style={{ display: "inline-block" }}
          >
            <RoomClose className="room-close" />
          </IconButton>
        </Link>
      </div>
      <div className="open-drawer-container">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <ChevronLeft className="chevron-left" />
        </IconButton>
      </div>
    </Wrapper>
  );
};

export default RoomAppbar;
