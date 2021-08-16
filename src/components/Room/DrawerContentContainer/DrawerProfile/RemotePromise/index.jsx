import { useState, useEffect } from 'react';

import { TextField, Grid } from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import Wrapper from './styles';

const RemotePromise = ({ remoteUserInfo, currentUserData }) => {
  const [promise, setPromise] = useState(remoteUserInfo?.promise);
  const [isSecret, setIsSecret] = useState(currentUserData?.isOpen);

  useEffect(() => {
    setPromise(remoteUserInfo?.promise);
    setIsSecret(remoteUserInfo?.isOpen);
    console.log(currentUserData)
    console.log(remoteUserInfo)
    console.log(isSecret)
  }, [remoteUserInfo, currentUserData])

  return (
    <Wrapper>
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
            backgroundColor: '#F6F7F9',
            padding: '20px',
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
              InputProps={{ disableUnderline: true }}
            />
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default RemotePromise;
