import clsx from 'clsx';
import { useState } from 'react';

import DrawerContentContainer from '../DrawerContentContainer';

import { 
  Drawer,
  IconButton
} from '@material-ui/core';

import {
  ChevronRight,
  AccountBox,
  Assignment,
  Whatshot,
} from '@material-ui/icons';

import { 
  Wrapper,
} from './styles';

const RoomDrawer = ({ children, handleDrawerClose, open, classes }) => {
  const [drawerNo, setDrawerNo] = useState(0);
  
  const handleDrawerNo = (e) => {
    console.log(e)
  }

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
            <ChevronRight className="chevron-right" />
          </IconButton>
          <div className="drawerHeader-right-container">
            <IconButton className="icon-button" name="drawer1" onClick={handleDrawerNo}>
              <span id="drawer1" className="drawer-span" />
              <AccountBox />
            </IconButton>
            <IconButton className="icon-button">
              <Assignment />
            </IconButton>
            <IconButton className="icon-button">
              <span id="drawer2" className="drawer-span" />
              <Whatshot />
            </IconButton>
          </div>
        </div>
        <DrawerContentContainer />
      </Drawer>
    </Wrapper>
  );
}

export default RoomDrawer