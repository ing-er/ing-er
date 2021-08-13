import {
  AppBar,
  Button,
  Grid,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsIcon from '@material-ui/icons/Settings';
import Wrapper from './styles';
import LoginContainer from '../../containers/LoginContainer';

import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router';

// tmp
import { BrightnessLow } from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Header = ({ isJoin, isAuth, onLogOutHandler }) => {
  const isTablet = useMediaQuery('(max-width:960px)');
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onLoginHandler = () => {
    setOpen(false);
    // if (isJoin === false && isAuth === false) {
    //   alert('로그인 후 입장 가능합니다.');
    // } else {
    //   if (isJoin) {
    //     history.push({ pathname: '/joinsetting' });
    //   } else {
    //     setOpen(false);
    //     history.push({ pathname: '/main' });
    //   }
    // }
  };

  return (
    <>
      <Wrapper>
        <AppBar position="fixed" className="appbar">
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className="header-grid"
          >
            <Grid item>
              <Link to="/">
                <img
                  className="logo"
                  alt="inger"
                  src="img/inger.png"
                  style={{
                    height: '13%',
                    width: '13%',
                    margin: '10px 10px 10px 10px',
                  }}
                />
                {/* <Typography variant="h6" className="logo">
                  Ing er
                </Typography> */}
              </Link>
            </Grid>

            <Grid item className="title display-none">
              <Grid container justify="center">
                {/* <Grid item>
                  <IconButton>
                    <InfoIcon htmlColor="white" style={{ fontSize: 30 }} />
                  </IconButton>
                </Grid> */}

                <Grid item>
                  {/* 마이페이지 */}
                  {isAuth && !isJoin ? (
                    <Link to="/Main">
                      <IconButton>
                        <AccountCircleIcon
                          htmlColor="white"
                          style={{ fontSize: 30 }}
                        />
                      </IconButton>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </Grid>

                {/* <Grid item>
                  {// 방 입장 }
                  {isAuth && !isJoin ? (
                    <IconButton onClick={onClickRoom}>
                      <MeetingRoomIcon htmlColor="white" />
                    </IconButton>
                  ) : (
                    null
                  )}
                </Grid> */}
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  {isAuth ? (
                    <div></div>
                  ) : (
                    <Button
                      variant="outlined"
                      style={{
                        borderRadius: '1.25rem',
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#E96F02',
                        marginRight: '1rem',
                        margin: '10px 25px 30px',
                      }}
                      onClick={handleClickOpen}
                    >
                      로그인
                    </Button>
                    // <IconButton onClick={handleClickOpen}>
                    //   <LockIcon htmlColor="white" />
                    // </IconButton>
                  )}
                  <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    // disableBackdropClick="true"
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={handleClose}
                    >
                      로그인 & 회원가입
                    </DialogTitle>
                    <DialogContent dividers>
                      <LoginContainer />
                    </DialogContent>
                    <Button onClick={onLoginHandler}>닫기</Button>
                    {/* {isJoin ? (
                      <Button
                        onClick={() =>
                          history.push({ pathname: '/joinsetting' })
                        }
                      >
                        확인
                      </Button>
                    ) : (
                      <Button
                        onClick={() => history.push({ pathname: '/main' })}
                      >
                        확인
                      </Button>
                    )} */}
                  </Dialog>
                </Grid>

                <Grid item>
                  {/* 멤버 설정 */}
                  {!isAuth ? (
                    <div></div>
                  ) : (
                    <Link to="/JoinSetting">
                      <IconButton>
                        <SettingsIcon
                          htmlColor="white"
                          style={{ fontSize: 30 }}
                        />
                      </IconButton>
                    </Link>
                  )}
                </Grid>

                <Grid item>
                  {/* 로그아웃 */}
                  {!isAuth ? (
                    <div></div>
                  ) : (
                    <IconButton onClick={onLogOutHandler}>
                      <LockOpenIcon
                        htmlColor="white"
                        style={{ fontSize: 30 }}
                      />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
      </Wrapper>
    </>
  );
};

export default Header;
