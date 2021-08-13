import clsx from 'clsx';

import RoomClose from '../../buttons/RoomClose';
import RoomPause from '../../buttons/RoomPause';
import RoomPlay from '../../buttons/RoomPlay';

import { Link } from 'react-router-dom';

import { IconButton } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';

import { motion } from 'framer-motion';
import { Wrapper, useDrawerStyles } from './styles';
import { useHistory } from 'react-router';

const RoomAppbar = ({
  handleDrawerOpen,
  leaveSession,
  isLocalVideoActive,
  handleVideoMute,
  open,
  classes,
}) => {
  const drawerClasses = useDrawerStyles();

  const history = useHistory();
  const handleLeaveSession = async () => {
    await leaveSession();
    history.push('/Main');
  };

  return (
    <Wrapper>
      <div
        className={clsx(drawerClasses.content, {
          [drawerClasses.contentShift]: open,
        })}
      >
        <IconButton
          onClick={handleVideoMute}
          className="room-buttons-container"
        >
          <motion.div
            whileHover={{
              scale: 1.3,
            }}
          >
            {isLocalVideoActive ? (
              <RoomPause className="room-pause" />
            ) : (
              <RoomPlay />
            )}
          </motion.div>
        </IconButton>
        <Link onClick={handleLeaveSession}>
          <IconButton
            className="room-buttons-container"
            style={{ display: 'inline-block' }}
          >
            <motion.div
              whileHover={{
                scale: 1.3,
              }}
            >
              <RoomClose className="room-close" />
            </motion.div>
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
