import RoomCalendar from '../../RoomCalendar';

import { 
  Grid,
  Typography,
} from '@material-ui/core';

import Wrapper from './styles';

const tmpStyle = {
  border: '1px solid blue',
}

const DrawerProfile = () => {
  return (
    <Wrapper style={tmpStyle}>
      <Grid className="nickname-container">
        <Typography variant="h4" className="nickname">닉네임</Typography>
      </Grid>
      <Grid className="calendar-container">
        <RoomCalendar />
      </Grid>
      <Grid className="date-time-container">
        <Typography className="date">7월 20일 (목)</Typography>
        <Typography className="time-text">오늘의 공부 시간</Typography>
        <Typography className="time">00 : 00 : 00</Typography>
      </Grid>
      <div>
        다짐
      </div>
    </Wrapper>
  )
}

export default DrawerProfile
