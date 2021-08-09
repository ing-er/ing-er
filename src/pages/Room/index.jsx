import { useState, useEffect } from 'react';

import ScreenContainer from '../../components/Room/ScreenContainer';
import RoomDrawer from '../../components/Room/Drawer';
import RoomAppbar from '../../components/Room/RoomAppbar';

import { CssBaseline } from '@material-ui/core';
import { Wrapper, useStyles } from './styles';

const Room = ({
  subscribers,
  publisher,
  leaveSession,
  handleVideoMute,
  isLocalVideoActive,
}) => {
  /* drawer */
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* webrtc */

  return (
    <Wrapper>
      <CssBaseline />
      <RoomAppbar
        handleVideoMute={handleVideoMute}
        handleDrawerOpen={handleDrawerOpen}
        leaveSession={leaveSession}
        open={open}
        classes={classes}
      />
      <RoomDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        classes={classes}
      >
        <ScreenContainer
          publisher={publisher}
          subscribers={subscribers}
          isLocalVideoActive={isLocalVideoActive}
        />
      </RoomDrawer>
    </Wrapper>
  );
};

export default Room;
