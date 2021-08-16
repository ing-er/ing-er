import { useState } from 'react';

import {
  TextField,
  Grid
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { useEffect } from 'react';

const CalendarDiary = ({ remoteUserInfo }) => {
  const [diary, setDiary] = useState(remoteUserInfo?.diary);
  const [isSecret, setIsSecret] = useState(remoteUserInfo?.isOpen);
  
  useEffect(() => {
    setDiary(remoteUserInfo?.diary);
    setIsSecret(remoteUserInfo?.isOpen);
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
        오늘의 일기
      </Grid>
      <Grid
        item
        className="textfield-grid"
        style={{
          backgroundColor: 'white',
        }}
      >
        {isSecret ? (
          <TextField 
            multiline={true}
            rows={8}
            fullWidth
            value={'비공개'}
            disabled={true}
          />
        ) : (
          <TextField
            multiline={true}
            rows={8}
            fullWidth
            value={diary ? diary : ''}
            disabled={true}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default CalendarDiary;
