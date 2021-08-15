import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  min-height: 64px;

  & .room-title {
    position:absolute;
    align-self: center;
    left: 0;
    margin-left: 1rem;
    font-family: 'Jua';
    color: #ffffff;
    font-size: 1.5rem;

  }
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
  & .center-buttons-container {
    display: flex;
    justify-content: space-between;
    margin: 0 0.5rem;
    z-index: 30;
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

  & .promise-container {
    margin: 2rem;

    & .promise {
      border: 1px solid black;
      border-radius: 5px;
      padding: 1rem;
      max-height: 150px;
      overflow: auto;
    }
  }

  & .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 101;
  }
  & .modal {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px 20px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;

    & p {
      color: #444;
      font-weight: bold;
    }
  }

  & .button-container {
    display: flex;
    justify-content: center;

    & button {
      font-weight: bold;
      margin: 0 1rem 0 1rem;
    }
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