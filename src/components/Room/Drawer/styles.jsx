import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 666px;
  display: flex;
  
  & .drawer {
    width: 300px;
    flex-shrink: 0;

    & .MuiDrawer-paper {
      width: 300px;
    }
  }

  & .drawer-button-area {
    position: fixed;
    right: 1rem;
  }
  & .chevron-left {
    margin: 5 5 0 0;
    background-color: #ffffff;
    border-radius: 5px;
  }
`;

const drawerWidth = 300;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    marginTop: '1.8rem',
    marginBottom: '1.8rem',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

