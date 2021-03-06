import { useState, useEffect } from 'react';

import Screen from '../Screen';
import Wrapper from './styles';

import { Grid } from '@material-ui/core';

const ScreenContainer = ({
  subscribers,
  publisher,
  isLocalVideoActive,
  studyTime,
  onIncrease,
  handleVideoClick,
}) => {
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
      <Grid container spacing={9}>
        <Grid item xs={12} md={6} lg={4}
          className="screen-item-container"
        >
          <Screen
            streamManager={publisher}
            isLocalVideoActive={isLocalVideoActive}
            studyTime={studyTime}
            onIncrease={onIncrease}
            isLocal={true}
            handleVideoClick={handleVideoClick}
          />
        </Grid>
        {subs.map((sub, idx) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={idx}
              className="screen-item-container"
            >
              <Screen
                streamManager={sub}
                isLocal={false}
                handleVideoClick={handleVideoClick}
              />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default ScreenContainer;
