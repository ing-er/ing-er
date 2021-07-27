import clsx from 'clsx';

import RoomClose from '../../buttons/RoomClose';
import RoomPause from '../../buttons/RoomPause';

import {
  IconButton
} from '@material-ui/core';

import {
  ChevronLeft,
} from '@material-ui/icons';

import {
  Wrapper,
  useDrawerStyles
} from './styles';

const RoomAppbar = ({ handleDrawerOpen, open, classes }) => {
  const drawerClasses = useDrawerStyles();

  return (
    <Wrapper>
      <div className={clsx(drawerClasses.content, {
        [drawerClasses.contentShift]: open,
      })}>
        <div style={{ marginRight: '1rem' }}>
          <RoomPause className="room-pause" />
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <RoomClose className="room-close" />
        </div>
      </div>
      <div className="open-drawer-container">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <ChevronLeft className="chevron-left"/>
        </IconButton>
      </div>

  </Wrapper>
  )
}

export default RoomAppbar;
