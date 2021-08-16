import { useState, useEffect } from 'react';

import CalendarComponent from '../../../Main/MyCalendar/CalendarComponent';
import CalendarDiary from '../../../Main/MyCalendar/CalendarDiary';
import CalendarPromise from '../../../Main/MyCalendar/CalendarPromise';
import RemotePromise from './RemotePromise';
import RemoteDiary from './RemoteDiary';
import RemoteCalendar from './RemoteCalendar';

import {
  getUserCalendarInfo,
  getUserCalendarList
} from '../../../../api/user';
import { secToTimeFormat } from '../../../../utils/timer';
import { getToday } from '../../../../utils/date';
import { changeZeroDateFormat } from '../../../../utils/date';
import { setCalendarBackground } from '../../../../utils/calendar';

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
  const [remoteRequestdate, setRemoterequestdate] = useState(getToday());
  const [remoteUserCalendarInfo, setRemoteUserCalendarInfo] =
    useState(undefined);
  const [remoteUserCalendarList, setRemoteUserCalendarList] = useState([]);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth() + 1);

  // remote user 변수
  useEffect(() => {
    if (!currentUserData) return;

    if (currentUserData.id === localUserData.id) {
      setIsLocal(true);
    } else {
      setIsLocal(false);

      // update remote user's single calendar info
      console.log('current user data hook 에서의 current user 데이터 변경 시 data')
      console.log(currentUserData)
      getUserCalendarInfo(currentUserData.id, remoteRequestdate).then((res) => {
        setRemoteUserCalendarInfo(res.data);
      });

      // update remoteUserCalendarList
      getUserCalendarList(currentUserData.id).then((res) => {
        setRemoteUserCalendarList(res.data);
      });
    }
  }, [currentUserData]);

  // 1.remote requestdate
  const handleRemoteRequestdate = (value) => {
    console.log('handleRemoteRequestdate');
    const currDate = changeZeroDateFormat(value);

    setRemoterequestdate(currDate);
  };

  // 2.remote request date hook
  useEffect(() => {
    console.log('remote 요청 날짜 변경')
    handleRemoteUserCalendarInfo();
  }, [remoteRequestdate]);

  // 3. handle remote user's single calendar info
  const handleRemoteUserCalendarInfo = () => {
    if (!currentUserData) return

    getUserCalendarInfo(currentUserData.id, remoteRequestdate).then((res) => {
      console.log('remote 요청 날짜 변경 후 현재 날짜 calendar info get')
      console.log(res.data)
      setRemoteUserCalendarInfo(res.data);
    });
  };

  // 4. handle calendar list
  const handleChange = ({ activeStartDate }) => {
    console.log('active month 변경')
    console.log(activeStartDate)
    const _activeMonth = activeStartDate.getMonth() + 1;
    setActiveMonth(_activeMonth);
  }

  // 5. update background colors
  useEffect(() => {
    console.log('background 변경 실행 후 calendarlist')
    console.log(remoteUserCalendarList)
    setCalendarBackground(remoteUserCalendarList);
  }, [activeMonth, remoteUserCalendarList]);

  const onClickSaveHandler = () => {
    setCalendarSaveData();
  };

  return (
    <Wrapper>
      <Grid className="name-container">
        <Typography variant="h4" className="name">
          {isLocal ? localUserData.name : currentUserData.name}
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
            handleChange={handleChange}
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
