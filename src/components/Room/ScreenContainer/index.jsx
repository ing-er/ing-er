import { useState, useEffect } from 'react';

import Screen from '../Screen';
import Wrapper from './styles';

import { Grid } from '@material-ui/core';

const ScreenContainer = ({ subscribers, publisher, isVideoActive }) => {
  const [subs, setSubs] = useState(new Array(5).fill(undefined));

  /* subscribers hook */
  useEffect(() => {
    if (!subscribers) return;
    let newSubs = new Array(5).fill(undefined);
    for (let i = 0; i < subscribers.length; i++) {
      newSubs[i] = subscribers[i];
    }
    setSubs([...newSubs]);
  }, [subscribers]);

  return (
    <Wrapper>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6} lg={4}>
          <Screen streamManager={publisher} isVideoActive={isVideoActive} />
        </Grid>
        {subs.map((sub, idx) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={idx}>
              <Screen streamManager={sub} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default ScreenContainer;
