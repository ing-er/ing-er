import { useState } from 'react';

import Screen from '../Screen';
import Wrapper from './styles';

import { 
  Grid,
} from '@material-ui/core';

const ScreenContainer = ({ publisher }) => {
  console.log('screen-container')
  console.log(publisher)
  const [screens, setScreens] = useState(new Array(6).fill(null))

  const onChangeScreen = () => {
    const newScreens = screens.slice()
    newScreens.forEach((screen, idx, array) => {
      console.log(idx, array)

      if (screen === null) {
        // logic
      }
    })
    setScreens(newScreens)
  }
  
  return (
    <Wrapper>
      <Grid container spacing={4}>
        {screens.map((screen, idx) => (
          <Grid item 
            xs={12} md={6} lg={6} xl={4}
            key={idx}
          >
            <Screen 
              screen_id={screen}
              publisher={publisher}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default ScreenContainer
