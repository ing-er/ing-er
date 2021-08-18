import { useState, useEffect } from 'react';

import { TextField, Grid } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import Wrapper from './styles';

const CalendarDiary = ({ remoteUserInfo, currentUserData }) => {
  const [diary, setDiary] = useState(remoteUserInfo?.diary);
  const [isSecret, setIsSecret] = useState(currentUserData?.isOpen);
  
  useEffect(() => {
    setDiary(remoteUserInfo?.diary);
    setIsSecret(currentUserData?.isOpen);
  }, [remoteUserInfo, currentUserData])
  
  return (
    <Wrapper>
      <Grid container direction="column" alignItems="center">
        <Grid
          item
          style={{
            fontSize: 20,
            color: '#0E263E',
          }}
        >
          <AssignmentIcon />
          오늘의 일기
        </Grid>
        <Grid
          item
          className="textfield-grid"
          style={{
            backgroundColor: '#F6F7F9',
            padding: '20px',
          }}
        >
          {!isSecret ? (
            <TextField 
              className="text-container"
              multiline={true}
              rows={1}
              fullWidth
              value={'비공개'}
              disabled={true}
              InputProps={{ disableUnderline: true }}
            />
          ) : (
            <TextField
              multiline={true}
              rows={8}
              fullWidth
              value={diary ? diary : ''}
              disabled={true}
              InputProps={{ disableUnderline: true }}
            />
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CalendarDiary;
