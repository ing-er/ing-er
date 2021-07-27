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
  const [drawerId, setDrawerId] = useState('drawerProfile');
  
  const handleDrawerNo = (e) => {
    const drawerId = e.currentTarget.id
    setDrawerId(drawerId)
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
            <IconButton id="drawerProfile" className="icon-button" onClick={handleDrawerNo}>
              <AccountBox />
            </IconButton>
            <IconButton id="drawerTodo" className="icon-button" onClick={handleDrawerNo}>
              <Assignment />
            </IconButton>
            <IconButton id="drawerPromise" className="icon-button" onClick={handleDrawerNo}>
              <Whatshot />
            </IconButton>
          </div>
        </div>
        <DrawerContentContainer 
          drawerId={drawerId}
        />
      </Drawer>
    </Wrapper>
  );
}

export default RoomDrawer