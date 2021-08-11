import {
  TextField,
  Grid,
  Container,
  IconButton,
  Button,
} from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import EditIcon from '@material-ui/icons/Edit';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import dayjs from 'dayjs';

const CalendarPromise = (props) => {
  let {
    calendardata,
    isEditablePromise,
    setCalendarEditPromise,
    setCalendarEditPromiseIsEditable,
  } = props;

  const onChangePromiseHandler = (e) => {
    setCalendarEditPromise(e.target.value);
  };
  const onClickPromiseHandler = () => {
    setCalendarEditPromiseIsEditable();
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        item
        style={{
          fontSize: 20,
        }}
      >
        <WhatshotIcon />
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
          <EditIcon />
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
  );
};

export default CalendarPromise;
