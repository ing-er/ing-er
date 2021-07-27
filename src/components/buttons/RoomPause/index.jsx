import { Pause } from '@material-ui/icons';
import {
  IconButton
} from '@material-ui/core';

import Wrapper from './styles';

const RoomClose = () => {
  return (
    <Wrapper>
      <IconButton>
        <Pause className="button"/>
      </IconButton>
    </Wrapper>
  )
}

export default RoomClose;
