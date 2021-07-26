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

import { useTheme } from '@material-ui/core/styles';
import { 
  Wrapper,
  useStyles
} from './styles';

const RoomDrawer = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <div>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        { children }
        </main>
      </div>
      <div className="drawer-button-area">
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