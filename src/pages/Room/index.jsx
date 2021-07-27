import { useState } from 'react';

import ScreenContainer from '../../components/Room/ScreenContainer';
import RoomDrawer from '../../components/Room/Drawer';
import RoomAppbar from '../../components/Room/RoomAppbar';


import { CssBaseline } from '@material-ui/core';
import {
  Wrapper,
  useStyles
 } from './styles';


const Room = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <CssBaseline />
      <RoomAppbar
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        classes={classes}
      />
      <RoomDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        classes={classes}
      >
        <ScreenContainer />
      </RoomDrawer>
    </Wrapper>
    
  )
}

export default Room
