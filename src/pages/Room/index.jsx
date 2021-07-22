import { CssBaseline } from '@material-ui/core';

import Screen from '../../components/Room/Screen'
import RoomDrawer from '../../components/Room/Drawer'

import Wrapper from './styles'


const Room = () => {
  return (
    <Wrapper>
      <CssBaseline />
      <RoomDrawer />
    </Wrapper>
    
  )
}

export default Room
