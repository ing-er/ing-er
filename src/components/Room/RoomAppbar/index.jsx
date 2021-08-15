import { useState } from 'react';
import { useHistory } from 'react-router';
import clsx from 'clsx';

import RoomClose from '../../buttons/RoomClose';
import RoomPause from '../../buttons/RoomPause';
import RoomPlay from '../../buttons/RoomPlay';

import { changeSessionFormat } from '../../../utils/room';

import { motion } from 'framer-motion';
import { IconButton } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Wrapper, useDrawerStyles } from './styles';

import Modal from './modal';

const RoomAppbar = ({
  handleDrawerOpen,
  leaveSession,
  isLocalVideoActive,
  handleVideoMute,
  mySessionId,
  open,
  classes,
}) => {
  const drawerClasses = useDrawerStyles();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleBeforeLeaveSession = () => {
    setShowModal(true);
  };

  const handleLeaveSession = async () => {
    await leaveSession();
    history.push('/Main');
  };

  return (
    <Wrapper>
      <Modal 
        showModal={showModal}
        setShowModal={setShowModal}
        handleLeaveSession={handleLeaveSession}
      />
      <div
        className={clsx(drawerClasses.content, {
          [drawerClasses.contentShift]: open,
        })}
      >
        <div className="room-title">
          {changeSessionFormat(mySessionId)}
        </div>
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
        <IconButton
          onClick={handleBeforeLeaveSession}
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
