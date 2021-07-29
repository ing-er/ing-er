import {
  TextField,
  Grid,
  Container,
  IconButton,
  Button,
} from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Wrapper from './styles';

const MyCalendar = (props) => {
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
  } = props;
  const onChangePromiseHandler = (e) => {
    setCalendarEditPromise(e.target.value);
  };
  const onChangeDiaryHandler = (e) => {
    setCalendarEditDiary(e.target.value);
  };
  const onClickPromiseHandler = () => {
    setCalendarEditPromiseIsEditable();
  };
  const onClickDiaryHandler = () => {
    setCalendarEditDiaryIsEditable();
  };
  const onChangeDate = (value, event) => {
    let year = value.getFullYear();
    let month = ('0' + (value.getMonth() + 1)).slice(-2);
    let day = ('0' + value.getDate()).slice(-2);
    console.log(year + '-' + month + '-' + day);
    setCalendarSetDate(year + '-' + month + '-' + day);
  };

  const onClickSaveHandler = () => {
    setCalendarSaveData();
  };

  return (
    <Wrapper>
      <Grid
        container
        className="all-container"
        direction="row"
        style={{
          backgroundColor: '#292A33',
        }}
      >
        <Grid
          container
          xs={12}
          justify="right"
          style={{ marginBottom: '20px' }}
        >
          <Button
            variant="outlined"
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              backgroundColor: '#E96F02',
            }}
            onClick={onClickSaveHandler}
          >
            저장
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              style={{
                fontWeight: 'bold',
                fontSize: 25,
              }}
            >
              {requestdate}
            </Grid>
            <Grid item>오늘의 공부 시간</Grid>
            <Grid
              item
              style={{
                fontSize: 40,
              }}
            >
              01 : 53 : 05
            </Grid>
            <Grid item>
              <Container className="calendar-container">
                <Calendar className="calendar" onChange={onChangeDate} />
              </Container>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid
                  item
                  style={{
                    fontSize: 20,
                  }}
                >
                  나의 오늘 다짐
                </Grid>
                <Grid
                  item
                  className="textfield-grid"
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <IconButton onClick={onClickPromiseHandler}>
                    <SettingsApplicationsIcon />
                  </IconButton>
                  <TextField
                    multiline={true}
                    rows={8}
                    fullWidth
                    value={calendardata.promise}
                    onChange={onChangePromiseHandler}
                    disabled={!isEditablePromise}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid
                  item
                  style={{
                    fontSize: 20,
                  }}
                >
                  나의 오늘 일기
                </Grid>
                <Grid
                  item
                  className="textfield-grid"
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <IconButton onClick={onClickDiaryHandler}>
                    <SettingsApplicationsIcon />
                  </IconButton>
                  <TextField
                    multiline={true}
                    rows={8}
                    fullWidth
                    value={calendardata.diary}
                    onChange={onChangeDiaryHandler}
                    disabled={!isEditableDiary}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default MyCalendar;
