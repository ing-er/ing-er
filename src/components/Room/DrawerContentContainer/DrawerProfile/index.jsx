import { useState, useEffect } from 'react';

import CalendarComponent from '../../../Main/MyCalendar/CalendarComponent';
import CalendarDiary from '../../../Main/MyCalendar/CalendarDiary';
import CalendarPromise from '../../../Main/MyCalendar/CalendarPromise';
import RemotePromise from './RemotePromise';
import RemoteDiary from './RemoteDiary';

import { getUserCalendarInfo } from '../../../../api/user';
import { secToTimeFormat } from '../../../../utils/timer';
import { getToday } from '../../../../utils/date';

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
    // setCalendarSaveData,
    setTodolistSetDate,
    studyTime,
    localUserData,
    currentUserData,
  } = props;

  const [isLocal, setIsLocal] = useState(true);
  const [currUserData, setCurrUserData] = useState(localUserData);
  const [currUserCalendarInfo, setCurrUserCalendarInfo] = useState(undefined);

  // current user 변경 시
  useEffect(() => {
    if (!currentUserData) return;

    if (currentUserData.id === localUserData.id) {
      setIsLocal(true);
    } else {
      setCurrUserData(currentUserData);
      setIsLocal(false);
    }
  }, [currentUserData]);

  // request date 변경 시
  useEffect(() => {
    handleCurrentUserCalendarInfo();
  }, [requestdate]);

  // requestdate 변경 시 현재 클릭된 유저 정보 기준 state 변경
  const handleCurrentUserCalendarInfo = () => {
    if (currUserData) {
      getUserCalendarInfo(currUserData.id, requestdate).then((res) => {
        if (res.data) {
          setCurrUserCalendarInfo(res.data);
        } else {
          setCurrUserCalendarInfo(undefined);
        }
      });
    }
  };

  return (
    <Wrapper>
      <Grid className="name-container">
        <Typography variant="h4" className="name">
          {currUserData ? currUserData.name : localUserData.name}
        </Typography>
      </Grid>
      <Grid className="calendar-container">
        <CalendarComponent
          setCalendarSetDate={setCalendarSetDate}
          setTodolistSetDate={setTodolistSetDate}
          isLightMode={false}
        />
      </Grid>
      <Grid className="date-time-container">
        <Typography className="date">{requestdate}</Typography>
        <Typography className="time-text">오늘의 공부 시간</Typography>
        <Typography className="time">
          {isLocal
            ? calendardata.date === getToday()
              ? secToTimeFormat(studyTime)
              : secToTimeFormat(calendardata.studyTime)
            : currUserCalendarInfo
            ? secToTimeFormat(currUserCalendarInfo.studyTime)
            : secToTimeFormat(0)}
        </Typography>
      </Grid>
      <Grid className="pd-container">
        <Grid className="pd-content-container">
          <div
            style={{
              // border: '1px solid black',
              textAlign: 'center',
              height: '100%',
            }}
          >
            {isLocal ? (
              <CalendarPromise
                calendardata={calendardata}
                isEditablePromise={isEditablePromise}
                setCalendarEditPromise={setCalendarEditPromise}
                setCalendarEditPromiseIsEditable={
                  setCalendarEditPromiseIsEditable
                }
                isLightMode={true}
              />
            ) : (
              <RemotePromise remotePromise={currUserCalendarInfo?.promise} />
            )}
          </div>
        </Grid>
        <Grid className="pd-content-container">
          <div
            style={{
              // border: '1px solid black',
              textAlign: 'center',
              height: '100%',
            }}
          >
            {isLocal ? (
              <CalendarDiary
                calendardata={calendardata}
                isEditableDiary={isEditableDiary}
                setCalendarEditDiary={setCalendarEditDiary}
                setCalendarEditDiaryIsEditable={setCalendarEditDiaryIsEditable}
                isLightMode={true}
              />
            ) : (
              <RemoteDiary remoteDiary={currUserCalendarInfo?.diary} />
            )}
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default DrawerProfile;
