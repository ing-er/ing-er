import { useState } from 'react';

import ScreenContainer from '../../components/Room/ScreenContainer';
import RoomDrawer from '../../components/Room/Drawer';
import DrawerAppbar from '../../components/Room/DrawerAppbar';


import { CssBaseline } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  Wrapper,
  useStyles
 } from './styles';


const Room = () => {
  const classes = useStyles();
  const theme = useTheme();

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
      <DrawerAppbar 
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        classes={classes}
      />
      <RoomDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        theme={theme}
        classes={classes}
      >
        <ScreenContainer />
      </RoomDrawer>
    </Wrapper>
    
  )
}

export default Room
