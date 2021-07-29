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

import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

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

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           className={classes.closeButton}
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

const Header = () => {
  const isTablet = useMediaQuery('(max-width:960px)');

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
                  {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    소개
                  </Button> */}
                  <IconButton>
                    <InfoIcon htmlColor="white" />
                  </IconButton>
                </Grid>

                <Grid item>
                  {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    마이페이지
                  </Button> */}
                  <Link to="/Main">
                    <IconButton>
                      <AccountCircleIcon htmlColor="white" />
                    </IconButton>
                  </Link>
                </Grid>

                <Grid item>
                  {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    방
                  </Button> */}
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
                  {/* <IconButton onClick={handleClickOpen}>
                    <LockIcon htmlColor="white" />
                  </IconButton>
                  <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={handleClose}
                    >
                      로그인 & 회원가입
                    </DialogTitle>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </Typography>
                      <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                      </Typography>
                      <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent
                        commodo cursus magna, vel scelerisque nisl consectetur
                        et. Donec sed odio dui. Donec ullamcorper nulla non
                        metus auctor fringilla.
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                      </Button>
                    </DialogActions>
                  </Dialog> */}
                  <Link to="/KakaoLogin">
                    <IconButton>
                      <LockIcon htmlColor="white" />
                    </IconButton>
                  </Link>
                </Grid>

                <Grid item>
                  {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    설정
                  </Button> */}
                  <Link to="/JoinSetting">
                    <IconButton>
                      <SettingsIcon htmlColor="white" />
                    </IconButton>
                  </Link>
                </Grid>

                <Grid item>
                  {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    로그아웃
                  </Button> */}
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
