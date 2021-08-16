import { useState, useEffect } from 'react';

import {
  TextField,
  Grid
} from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const RemotePromise = ({ remoteUserInfo }) => {
  const [promise, setPromise] = useState(remoteUserInfo.promise);

  useEffect(() => {
    console.log('calendarPromise constructor hook')
    setPromise(remoteUserInfo.promise);
  }, [remoteUserInfo])

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
          value={promise ? promise : ''}
          disabled={true}
        />
      </Grid>
    </Grid>
  );
};

export default RemotePromise;
