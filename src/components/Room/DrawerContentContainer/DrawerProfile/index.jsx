import { useState, useEffect } from 'react';

import CalendarComponent from '../../../Main/MyCalendar/CalendarComponent';
import CalendarDiary from '../../../Main/MyCalendar/CalendarDiary';
import CalendarPromise from '../../../Main/MyCalendar/CalendarPromise';

import { secToTimeFormat } from '../../../../utils/timer';

import { Grid, Typography } from '@material-ui/core';

import Wrapper from './styles';

const DrawerProfile = (props) => {
  let {
    calendardata,
    setCalendarEditPromise,
    setCalendarEditDiary,
    setCalendarEditPromiseIsEditable,
    setCalendarEditDiaryIsEditable,
    setCalendarSetDate,
    requestdate,
    isEditablePromise,
    isEditableDiary,
    setCalendarSaveData,
    setTodolistSetDate,
    studyTime,
  } = props;

  const [localDayStudyTime, setLocalDayStudyTime] = useState(undefined);

  useEffect(() => {
    if (calendardata.id !== -1) {

    }
    console.log(calendardata)
  }, [])

  return (
    <Wrapper>
      <Grid className="name-container">
        <Typography variant="h4" className="name"></Typography>
      </Grid>
      <Grid className="calendar-container">
        <CalendarComponent
          setCalendarSetDate={setCalendarSetDate}
          setTodolistSetDate={setTodolistSetDate}
        />
      </Grid>
      <Grid className="date-time-container">
        <Typography className="date">{requestdate}</Typography>
        <Typography className="time-text">오늘의 공부 시간</Typography>
        <Typography className="time">{localDayStudyTime ? localDayStudyTime : '00 : 00 : 00'}</Typography>
        
        {/* <Typography className="time">{secToTimeFormat(studyTime)}</Typography> */}
      </Grid>
      <Grid className="pd-container">
        <Grid className="pd-content-container">
          <p
            style={{
              border: '1px solid black',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <CalendarPromise
              calendardata={calendardata}
              isEditablePromise={isEditablePromise}
              setCalendarEditPromise={setCalendarEditPromise}
              setCalendarEditPromiseIsEditable={
                setCalendarEditPromiseIsEditable
              }
            />
          </p>
        </Grid>
        <Grid className="pd-content-container">
          <p
            style={{
              border: '1px solid black',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <CalendarDiary
              calendardata={calendardata}
              isEditableDiary={isEditableDiary}
              setCalendarEditDiary={setCalendarEditDiary}
              setCalendarEditDiaryIsEditable={setCalendarEditDiaryIsEditable}
            />
          </p>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default DrawerProfile;
