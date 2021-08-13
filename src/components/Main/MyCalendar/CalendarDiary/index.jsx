import { TextField, Grid, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

const CalendarDiary = (props) => {
  let {
    calendardata,
    isEditableDiary,
    setCalendarEditDiary,
    setCalendarEditDiaryIsEditable,
    isLightMode,
  } = props;

  const onChangeDiaryHandler = (e) => {
    setCalendarEditDiary(e.target.value);
  };

  const onClickDiaryHandler = () => {
    setCalendarEditDiaryIsEditable();
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
        }}
      >
        <AssignmentIcon />
        나의 오늘 일기
      </Grid>
      <Grid
        item
        className="textfield-grid"
        style={{
          backgroundColor: changeTextFieldColor(),
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
          InputProps={{ disableUnderline: true }}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarDiary;
