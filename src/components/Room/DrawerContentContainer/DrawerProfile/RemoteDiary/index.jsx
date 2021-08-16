import { useState } from 'react';

import {
  TextField,
  Grid
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { useEffect } from 'react';

const CalendarDiary = ({ remoteUserInfo }) => {
  const [diary, setDiary] = useState(remoteUserInfo.diary);
  
  useEffect(() => {
    console.log('calendarDiary constructor hook')
    setDiary(remoteUserInfo.diary)
  }, [remoteUserInfo])
  
  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        item
        style={{
          fontSize: 20,
        }}
      >
        <AssignmentIcon />
        나의 오늘 일기
      </Grid>
      <Grid
        item
        className="textfield-grid"
        style={{
          backgroundColor: 'white',
        }}
      >
        <TextField
          multiline={true}
          rows={8}
          fullWidth
          value={diary ? diary : ''}
          disabled={true}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarDiary;
