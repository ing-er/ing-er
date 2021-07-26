import React from 'react';
import clsx from 'clsx';

import { 
  Drawer,
  IconButton
} from '@material-ui/core';

import {
  ChevronLeft,
  ChevronRight
} from '@material-ui/icons';

import { 
  Wrapper,
} from './styles';

const RoomDrawer = ({ children, handleDrawerClose, open, theme, classes }) => {

  return (
    <Wrapper>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      { children }
      </main>

      <Drawer
        className="drawer"
        variant="persistent"
        anchor="right"
        open={open}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
      </Drawer>
    </Wrapper>
  );
}

export default RoomDrawer