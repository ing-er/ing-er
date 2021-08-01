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
import KakaoLogin from '../../pages/KakaoLogin';

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

const Header = () => {
  const isTablet = useMediaQuery('(max-width:960px)');
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
                <Typography variant="h6" className="logo">
                  Ing er
                </Typography>
              </Link>
            </Grid>

            <Grid item className="title display-none">
              <Grid container justify="center">
                <Grid item>
                  {/*  소개 */}
                  <IconButton>
                    <InfoIcon htmlColor="white" />
                  </IconButton>
                </Grid>

                <Grid item>
                  {/* 마이페이지 */}
                  <Link to="/Main">
                    <IconButton>
                      <AccountCircleIcon htmlColor="white" />
                    </IconButton>
                  </Link>
                </Grid>

                <Grid item>
                  <Link to="/room">
                    <IconButton>
                      <MeetingRoomIcon htmlColor="white" />
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton onClick={handleClickOpen}>
                    <LockIcon htmlColor="white" />
                  </IconButton>
                  <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    style={{
                      margin: '10px 10px 10px 10px',
                    }}
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
                    <Button
                      onClick={() => {
                        history.push({
                          pathname: '/joinsetting',
                          // state: { kakaoIdNum: oAuthId },
                        });
                      }}
                    >
                      확인
                    </Button>
                  </Dialog>
                </Grid>

                <Grid item>
                  {/* 멤버 설정 */}
                  <Link to="/JoinSetting">
                    <IconButton>
                      <SettingsIcon htmlColor="white" />
                    </IconButton>
                  </Link>
                </Grid>

                <Grid item>
                  {/* 로그아웃 */}
                  <IconButton>
                    <LockOpenIcon htmlColor="white" />
                  </IconButton>
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
