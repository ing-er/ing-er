import {
  TextField,
  Grid
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

const CalendarDiary = ({ remoteDiary }) => {
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
        <TextField
          multiline={true}
          rows={8}
          fullWidth
          value={remoteDiary}
          disabled={true}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarDiary;
