import { CssBaseline } from '@material-ui/core';

import ScreenContainer from '../../components/Room/ScreenContainer'
import RoomDrawer from '../../components/Room/Drawer'

import Wrapper from './styles'


const Room = () => {
  return (
    <Wrapper>
      <CssBaseline />
      <RoomDrawer>
        <ScreenContainer />
      </RoomDrawer>
    </Wrapper>
    
  )
}

export default Room
