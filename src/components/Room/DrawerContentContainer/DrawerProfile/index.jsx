import { useState, useEffect } from 'react';

import CalendarComponent from '../../../Main/MyCalendar/CalendarComponent';
import CalendarDiary from '../../../Main/MyCalendar/CalendarDiary';
import CalendarPromise from '../../../Main/MyCalendar/CalendarPromise';
import RemotePromise from './RemotePromise';
import RemoteDiary from './RemoteDiary';
import RemoteCalendar from './RemoteCalendar';

import { getUserCalendarInfo, getUserCalendarList } from '../../../../api/user';
import { secToTimeFormat } from '../../../../utils/timer';
import { getToday } from '../../../../utils/date';
import { changeZeroDateFormat } from '../../../../utils/date';

import { Grid, Typography, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

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
    localUserData,
    currentUserData,
  } = props;

  const [isLocal, setIsLocal] = useState(true);
  const [remoteRequestdate, setRemoterequestdate] = useState(undefined);
  const [remoteUserData, setRemoteUserData] = useState(undefined);
  const [remoteUserCalendarInfo, setRemoteUserCalendarInfo] = useState(undefined);

  // remote user 변수
  useEffect(() => {
    console.log('currentuserData!!')
    console.log(currentUserData)
    console.log('remoteRequestdate')
    console.log(remoteRequestdate)
    console.log('remoteUserData')
    console.log(remoteUserData)
    console.log('remoteUserCalendarInfo')
    console.log(remoteUserCalendarInfo)
    if (!currentUserData) return;

    if (currentUserData.id === localUserData.id) {
      setIsLocal(true);
    } else {
      setRemoteUserData(currentUserData);
      setIsLocal(false);

      // remoteUserCalendarInfo call
      getUserCalendarList(currentUserData.id)
        .then((res) => {
          setRemoteUserCalendarInfo(res.data);
        })
    }
  }, [currentUserData]);

  // remote request date 변수
  useEffect(() => {
    handleRemoteUserCalendarInfo();
  }, [remoteRequestdate]);

  // remote requestdate
  const handleRemoteUserCalendarInfo = () => {
    if (remoteUserData) {
      getUserCalendarInfo(remoteUserData.id, requestdate).then((res) => {
        if (res.data) {
          setRemoteUserCalendarInfo(res.data);
        } else {
          setRemoteUserCalendarInfo(undefined);
        }
      });
    }
  };

  // remote request date handler
  const handleRemoteRequestdate = (value) => {
    console.log('handleRemoteRequestdate');
    const currDate = changeZeroDateFormat(value);

    setRemoterequestdate(currDate);
  }

  const onClickSaveHandler = () => {
    setCalendarSaveData();
  };

  return (
    <Wrapper>
      <Grid className="name-container">
        <Typography variant="h4" className="name">
          {isLocal ? localUserData.name : remoteUserData.name}
        </Typography>
      </Grid>
      <Grid className="calendar-container">
        {isLocal ? (
          <CalendarComponent
            setCalendarSetDate={setCalendarSetDate}
            setTodolistSetDate={setTodolistSetDate}
            isLightMode={false}
          />
        ) : (
          <RemoteCalendar 
            handleRemoteRequestdate={handleRemoteRequestdate}
          />
        )}
      </Grid>
      <Grid className="date-time-container">
        <Typography className="date">{requestdate}</Typography>
        <Typography className="time-text">오늘 공부 시간</Typography>
        <Typography className="time">
          {isLocal
            ? calendardata.date === getToday()
              ? secToTimeFormat(studyTime)
              : secToTimeFormat(calendardata.studyTime)
            : remoteUserCalendarInfo
              ? secToTimeFormat(remoteUserCalendarInfo.studyTime)
              : secToTimeFormat(0)}
        </Typography>
      </Grid>
      {isLocal && (
        <Grid container justify="center">
          <IconButton onClick={onClickSaveHandler}>
            <SaveIcon htmlColor="#E96F02" />
          </IconButton>
        </Grid>
      )}

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
              <RemotePromise remoteUserInfo={remoteUserCalendarInfo} />
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
              <RemoteDiary remoteUserInfo={remoteUserCalendarInfo} />
            )}
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default DrawerProfile;
