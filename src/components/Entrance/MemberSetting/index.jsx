import React, { useState } from 'react';
import Wrapper from './styles';
import {
  Button,
  Grid,
  Container,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function MEMBERSETTING({
  isJoin,
  isAuth,
  nickname,
  setNickname,
  category,
  setCategory,
  isPublic,
  setIsPublic,
  onUpdateInfo,
  onDuplicateHandler,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitchChange = (newValue) => {
    if (newValue === true) {
      setIsPublic(false);
    } else {
      setIsPublic(true);
    }
  };

  return (
    <Wrapper>
      <Container
        className="all-container"
        style={{
          alignItems: 'center',
        }}
      >
        <Grid container direction="column" className="container">
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={2}>
                <h1>닉네임</h1>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item xs={1}>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      className="nickname-input"
                      type="nickname"
                      value={nickname}
                      label="With a grid"
                      borderColor="white"
                      onChange={(e) => {
                        setNickname(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: '1.25rem',
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: '#E96F02',
                  }}
                  onClick={onDuplicateHandler}
                >
                  중복 확인
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="category-container">
            <Grid container direction="column">
              <Grid item xs={12}>
                <h1>카테고리 설정</h1>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                spacing={2}
                xs={12}
              >
                <Grid item xs={2}>
                  <Button
                    class="button"
                    value="201"
                    onClick={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    수능
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    class="button"
                    value="202"
                    onClick={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    취준
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    class="button"
                    value="203"
                    onClick={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    자격증
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    class="button"
                    value="204"
                    onClick={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    고시
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    class="button"
                    value="205"
                    onClick={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    기타
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={3}>
                <h1>다짐 공개 여부</h1>
              </Grid>
              <Grid item xs={7}></Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Switch
                      value={isPublic}
                      onChange={handleSwitchChange}
                      style={{ color: '#E96F02' }}
                    />
                  }
                  labelPlacement="top"
                  label={
                    <Box component="div" fontSize={12}>
                      기본 값이 ‘공개’
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {!isJoin && isAuth ? (
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12}
              >
                <Grid item xs={2}>
                  <h1>회원 탈퇴</h1>
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    style={{
                      borderRadius: '1.25rem',
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor: '#CD0C22',
                    }}
                    onClick={handleClickOpen}
                  >
                    탈퇴하기
                  </Button>
                  <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={handleClose}
                    >
                      회원 탈퇴
                    </DialogTitle>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        공부기록 등 그 외 사용자가 설정한 모든 정보가 사라지고,
                        <br></br>
                        복구가 불가능 합니다.
                      </Typography>
                      <Typography gutterBottom>
                        그래도 탈퇴하시겠다면,
                        <br></br>
                        하단에 아이디를 한 번 더 입력해 주십시오.
                      </Typography>
                      <Grid item xs={12}>
                        <Grid item xs={8}></Grid>
                        <input
                          type="text"
                          style={{
                            float: 'rignt',
                          }}
                        />
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        autoFocus
                        onClick={handleClose}
                        style={{
                          color: '#CD0C22',
                        }}
                      >
                        탈퇴하기
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
          <Grid item xs={12}>
            <Grid container direction="row" justify="center" spacing={2}>
              <Grid item>
                <IconButton class="check" onClick={onUpdateInfo}>
                  <HowToRegIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton class="cancel">
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <h1>{nickname}</h1>
            <h1>{category}</h1>
          </Grid> */}
        </Grid>
      </Container>
    </Wrapper>
  );
}
export default MEMBERSETTING;
