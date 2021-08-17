import { TextField, Grid, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const CalendarPromise = (props) => {
  let {
    calendardata,
    isEditablePromise,
    setCalendarEditPromise,
    setCalendarEditPromiseIsEditable,
    isLightMode,
  } = props;

  const onChangePromiseHandler = (e) => {
    setCalendarEditPromise(e.target.value);
  };
  const onClickPromiseHandler = () => {
    setCalendarEditPromiseIsEditable();
  };
  const changeTextColor = () => {
    if (!isLightMode) {
      return 'white';
    } else {
      return '#0E263E';
    }
  };
  const changeTextFieldColor = () => {
    if (!isLightMode) {
      return 'white';
    } else {
      return '#F6F7F9';
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        item
        style={{
          fontSize: 20,
          color: changeTextColor(),
          fontFamily: 'bold',
        }}
      >
        <WhatshotIcon />
        나의 오늘 다짐
      </Grid>
      <Grid
        item
        className="textfield-grid"
        style={{
          backgroundColor: changeTextFieldColor(),
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
          InputProps={{ disableUnderline: true }}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPromise;
