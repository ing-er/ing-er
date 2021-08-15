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
  studyTime,
  onIncrease,
  currentUserData,
  handleVideoClick,
  handleDrawerOpen,
  handleDrawerClose,
  open,
  mySessionId,
}) => {
  /* drawer */
  const classes = useStyles();

  return (
    <Wrapper>
      <CssBaseline />
      <RoomAppbar
        handleVideoMute={handleVideoMute}
        handleDrawerOpen={handleDrawerOpen}
        isLocalVideoActive={isLocalVideoActive}
        leaveSession={leaveSession}
        mySessionId={mySessionId}
        open={open}
        classes={classes}
      />
      <RoomDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        classes={classes}
        studyTime={studyTime}
        currentUserData={currentUserData}
      >
        <ScreenContainer
          publisher={publisher}
          subscribers={subscribers}
          isLocalVideoActive={isLocalVideoActive}
          studyTime={studyTime}
          onIncrease={onIncrease}
          handleVideoClick={handleVideoClick}
        />
      </RoomDrawer>
    </Wrapper>
  );
};

export default Room;
