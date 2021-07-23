import React from 'react';
import clsx from 'clsx';

import Screen from '../Screen'

import { 
  Drawer,
  Grid,
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

const RoomDrawer = () => {
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
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Grid container spacing={3}>
          {Array(6).fill(1).map( (value, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4}>
              <Screen />
            </Grid>
          ))}
          
        </Grid>
        
      </main>
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