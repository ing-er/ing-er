import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginContainer from '../../containers/LoginContainer';
import { scrollHeader } from '../../utils/header';
import {
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import LockOpenIcon from '@material-ui/icons/LockOpen';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SettingsIcon from '@material-ui/icons/Settings';

import Wrapper from './styles';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  MuiDialogTitle: {
    color: 'white',
    backgroundColor: '#292A33',
    fontFamily: 'bold',
  },
  MuiDialogContent: {
    backgroundColor: '#292A33',
  },
  MuiDialogActions: {
    backgroundColor: '#292A33',
  },
});

const Header = ({
  isJoin,
  isAuth,
  isAdmin,
  onSettingHandler,
  onLogOutHandler,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onLoginHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    scrollHeader();
  }, []);

  return (
    <Wrapper>
      <Grid className="header-container">
        <Grid>
          <Link to="/">
            <motion.img
              className="logo"
              alt="inger"
              src="img/inger.png"
              whileHover={{
                scale: 1.2,
              }}
            />
          </Link>
        </Grid>

        {/* 마이페이지 */}
        {isAuth && !isJoin && !isAdmin ? (
          <Grid className="title">
            <Grid container justifyContent="center">
              <Link to="/Main">
                <IconButton>
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                    }}
                  >
                    <EventNoteIcon htmlColor="white" style={{ fontSize: 30 }} />
                    {/* <AccountCircleIcon
                      htmlColor="white"
                      style={{ fontSize: 30 }}
                    /> */}
                  </motion.div>
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        ) : null}

        {!isAuth ? null : (
          // 멤버수정 & 로그아웃
          <Grid className="setting-container">
            <Grid>
              <IconButton onClick={onSettingHandler}>
                <motion.div
                  whileHover={{
                    scale: 1.2,
                  }}
                >
                  <SettingsIcon htmlColor="white" style={{ fontSize: 30 }} />
                </motion.div>
              </IconButton>
            </Grid>
            {/* <Grid>
              <Link to="/JoinSetting">
                <IconButton>
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                    }}
                  >
                    <SettingsIcon htmlColor="white" style={{ fontSize: 30 }} />
                  </motion.div>
                </IconButton>
              </Link>
            </Grid> */}
            <Grid>
              <IconButton onClick={onLogOutHandler}>
                <motion.div
                  whileHover={{
                    scale: 1.2,
                  }}
                >
                  <LockOpenIcon htmlColor="white" style={{ fontSize: 30 }} />
                </motion.div>
              </IconButton>
            </Grid>
          </Grid>
        )}

        {/* login */}
        {isAuth ? null : (
          <Grid>
            <motion.div
              whileHover={{
                scale: 1.2,
              }}
            >
              <Button
                variant="outlined"
                className="login-button"
                onClick={handleClickOpen}
              >
                로그인
              </Button>
            </motion.div>
          </Grid>
        )}
      </Grid>

      {/* dialog */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{
          borderRadius: 10,
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          classes={{
            root: classes.MuiDialogTitle,
          }}
        >
          로그인 & 회원가입
        </DialogTitle>
        <DialogContent
          dividers
          classes={{
            root: classes.MuiDialogContent,
          }}
        >
          <LoginContainer />
        </DialogContent>
        <Button
          onClick={onLoginHandler}
          style={{
            backgroundColor: '#292A33',
            color: 'white',
            fontFamily: 'bold',
          }}
        >
          닫기
        </Button>
      </Dialog>
    </Wrapper>
  );
};

export default Header;
