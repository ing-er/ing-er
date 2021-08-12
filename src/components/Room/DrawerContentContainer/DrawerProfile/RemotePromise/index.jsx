import {
  TextField,
  Grid
} from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const RemotePromise = ({ remotePromise }) => {
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
        <TextField
          multiline={true}
          rows={8}
          fullWidth
          value={remotePromise}
          disabled={true}
        />
      </Grid>
    </Grid>
  );
};

export default RemotePromise;
