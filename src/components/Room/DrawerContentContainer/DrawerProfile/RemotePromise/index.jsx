import { useState, useEffect } from 'react';

import {
  TextField,
  Grid
} from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const RemotePromise = ({ remoteUserInfo }) => {
  const [promise, setPromise] = useState(remoteUserInfo?.promise);
  const [isSecret, setIsSecret] = useState(remoteUserInfo?.isOpen);

  useEffect(() => {
    setPromise(remoteUserInfo?.promise);
    setIsSecret(remoteUserInfo?.isOpen);
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
        오늘의 다짐
      </Grid>
      <Grid
        item
        className="textfield-grid"
        style={{
          backgroundColor: 'white',
        }}
      >
        {isSecret ? (
          <TextField 
            multiline={true}
            rows={8}
            fullWidth
            value={'비공개'}
            disabled={true}
          />
        ) : (
          <TextField
            multiline={true}
            rows={8}
            fullWidth
            value={promise ? promise : ''}
            disabled={true}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default RemotePromise;
