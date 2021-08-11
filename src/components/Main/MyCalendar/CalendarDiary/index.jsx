import {
  TextField,
  Grid,
  Container,
  IconButton,
  Button,
} from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';
import dayjs from 'dayjs';

const CalendarDiary = (props) => {
  let {
    calendardata,
    isEditableDiary,
    setCalendarEditDiary,
    setCalendarEditDiaryIsEditable,
  } = props;

  const onChangeDiaryHandler = (e) => {
    setCalendarEditDiary(e.target.value);
  };

  const onClickDiaryHandler = () => {
    setCalendarEditDiaryIsEditable();
  };
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
        <IconButton onClick={onClickDiaryHandler}>
          <EditIcon />
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
  );
};

export default CalendarDiary;
