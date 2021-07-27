import { PowerSettingsNew } from '@material-ui/icons';
import {
  IconButton
} from '@material-ui/core';

import Wrapper from '../RoomPause/styles';

const RoomClose = () => {
  return (
    <Wrapper>
      <IconButton>
        <PowerSettingsNew className="button"/>
      </IconButton>
    </Wrapper>
  )
}

export default RoomClose;
