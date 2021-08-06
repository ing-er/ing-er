import { useState, useEffect } from 'react';

import Screen from '../Screen';
import Wrapper from './styles';

import { Grid } from '@material-ui/core';

const ScreenContainer = ({ subscribers }) => {
  // const [subs, setSubs] = useState(
  //   new Array(6).fill(undefined),
  // );

  /* subscribers hook */
  // useEffect(() => {
  //   if (!subscribers) return
  //   let newSubs = new Array(6).fill(undefined);
  //   for (let i = 0; i < subscribers.length; i++) {
  //     newSubs[i] = subscribers[i]
  //   }
  //   setSubs([...newSubs])
  // }, [subscribers])

  return (
    <Wrapper>
      <Grid container spacing={4}>
        {subscribers.map((subscriber, idx) => (
          <Grid item xs={12} md={6} lg={6} xl={4} key={idx}>
            <Screen 
              subscriber={subscriber}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ScreenContainer;
