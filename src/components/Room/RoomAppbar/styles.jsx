import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  min-height: 64px;

  & .center-buttons {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  }
  & .room-buttons-container {
    font-size: 0;
    padding: 0;
    margin: 1rem;
    cursor: pointer;
  }
  & .room-pause {
    
  }
  & .room-close {
    
  }
  & .center-buttons-container {
    display: flex;
    justify-content: space-between;
    margin: 0 0.5rem;
    z-index: 11;
  }
  & .open-drawer-container {
    position: fixed;
  }
  & .chevron-left {
    position: fixed;
    right: 1rem;
    background-color: #ffffff;
    border-radius: 5px;
  }
`

const drawerWidth = 400;
export const useDrawerStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
}));