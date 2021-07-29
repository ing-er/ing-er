import { useState } from 'react';

import RoomCalendar from '../../RoomCalendar';

import { 
  Grid,
  Typography,
} from '@material-ui/core';

import Wrapper from './styles';

const DrawerProfile = () => {
  return (
    <Wrapper>
      <Grid className="nickname-container">
        <Typography variant="h4" className="nickname"></Typography>
      </Grid>
      <Grid className="calendar-container">
        <RoomCalendar />
      </Grid>
      <Grid className="date-time-container">
        <Typography className="date">7월 20일 (목)</Typography>
        <Typography className="time-text">오늘의 공부 시간</Typography>
        <Typography className="time">00 : 00 : 00</Typography>
      </Grid>
      <Grid className="pd-container">
        <Grid className="pd-content-container">
          <p style={{ border: '1px solid black', textAlign: 'center', height: '100%' }}>다짐 component</p>
        </Grid>
        <Grid className="pd-content-container">
          <p style={{ border: '1px solid black', textAlign: 'center', height: '100%' }}>일기 component</p>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default DrawerProfile
