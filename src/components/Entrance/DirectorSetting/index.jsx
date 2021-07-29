import React from 'react';
import Wrapper from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CancelIcon from '@material-ui/icons/Cancel';
import { green } from '@material-ui/core/colors';

import {
  // Button,
  Grid,
  Container,
  Button,
  TextField,
  createTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const DIRECTORSETTING = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <Container
        className="all-container"
        style={{
          alignItems: 'center',
        }}
      >
        <Grid container direction="column" spacing={2} className="container">
          {/* <Grid item xs={9}> */}
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={4}>
                <h1>관리자 권한</h1>
              </Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={3}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item xs={1}>
                    <div className={classes.root}>
                      <Toolbar>
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                          />
                        </div>
                      </Toolbar>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
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
                <h1>공통 코드 관리</h1>
              </Grid>
              <Grid item xs={7}></Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: '1.25rem',
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: '#292A33',
                  }}
                  onClick={handleClickOpen}
                >
                  추가하기
                </Button>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  PaperProps={{
                    style: {
                      backgroundColor: '#292A33',
                      boxShadow: 'none',
                      color: 'white',
                    },
                  }}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    코드 추가
                  </DialogTitle>
                  <CssTextField
                    className={classes.margin}
                    id="custom-css-standard-input"
                    label="코드 유형"
                    style={{
                      color: 'white',
                    }}
                  />
                  <CssTextField
                    className={classes.margin}
                    id="custom-css-standard-input"
                    label="코드"
                  />
                  <CssTextField
                    className={classes.margin}
                    id="custom-css-standard-input"
                    label="코드명"
                  />
                  <DialogActions>
                    <Button
                      autoFocus
                      onClick={handleClose}
                      style={{
                        color: '#E96F02',
                      }}
                    >
                      추가
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default DIRECTORSETTING;

// import React, { useState } from 'react';
// import Wrapper from './styles';
// import {
//   // Button,
//   Grid,
//   Container,
//   // TextField,
//   IconButton,
// } from '@material-ui/core';
// // import AccountCircle from '@material-ui/icons/AccountCircle';
// // import HowToRegIcon from '@material-ui/icons/HowToReg';
// // import CancelIcon from '@material-ui/icons/Cancel';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';

// import { withStyles } from '@material-ui/core/styles';
// // import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// // const DialogTitle = withStyles(styles)((props) => {
// //   const { children, classes, onClose, ...other } = props;
// //   return (
// //     <MuiDialogTitle disableTypography className={classes.root} {...other}>
// //       <Typography variant="h6">{children}</Typography>
// //       {onClose ? (
// //         <IconButton
// //           aria-label="close"
// //           className={classes.closeButton}
// //           onClick={onClose}
// //         >
// //           <CloseIcon />
// //         </IconButton>
// //       ) : null}
// //     </MuiDialogTitle>
// //   );
// // });

// // const DialogContent = withStyles((theme) => ({
// //   root: {
// //     padding: theme.spacing(2),
// //   },
// // }))(MuiDialogContent);

// // const DialogActions = withStyles((theme) => ({
// //   root: {
// //     margin: 0,
// //     padding: theme.spacing(1),
// //   },
// // }))(MuiDialogActions);

// function DIRECTORSETTING() {
//   //   const [open, setOpen] = React.useState(false);

//   //   const handleClickOpen = () => {
//   //     setOpen(true);
//   //   };
//   //   const handleClose = () => {
//   //     setOpen(false);
//   //   };

//   //   const [tmpNickname, setTmpNickname] = useState(nickname);
//   //   const [tmpCategory, setTmpCategory] = useState('');

//   //   const onNicknameChange = (e) => {
//   //     setTmpNickname(e.target.value);
//   //     console.log(e.target.value);
//   //     //   console.log(setTmpNickname);
//   //     //   // this.tmpNickname = e.currentTarget.value;
//   //   };
//   //   const onCategoryChange = (e) => {
//   //     setTmpCategory(e.target.value);
//   //     this.tmpCategory = e.currentTarget.value;
//   //     //   this.tmpCategory = e.currentTarget.value;
//   //   };
//   //   const onClick = () => {
//   //     console.log(tmpNickname);
//   //     console.log(tmpCategory);
//   //   };

//   return (
//     <Wrapper>
//       <Container
//         className="all-container"
//         style={{
//           alignItems: 'center',
//         }}
//       >
//         <Grid container direction="column" className="container">
//           <Grid item xs={12}>
//             <Grid
//               container
//               direction="row"
//               justify="center"
//               alignItems="center"
//               xs={12}
//             >
//               <Grid item xs={2}>
//                 <h1>관리자 권한</h1>
//               </Grid>
//               {/* <Grid item xs={8}>
//                 <Grid container spacing={1} alignItems="flex-end">
//                   <Grid item xs={1}>
//                     <AccountCircle />
//                   </Grid>
//                   <Grid item xs={11}>
//                     <TextField
//                       type="nickname"
//                       value={tmpNickname}
//                       onChange={onNicknameChange}
//                       label="With a grid"
//                       borderColor="white"
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={2}>
//                 <Button
//                   variant="outlined"
//                   style={{
//                     borderRadius: '1.25rem',
//                     color: 'white',
//                     fontWeight: 'bold',
//                     backgroundColor: '#E96F02',
//                   }}
//                 >
//                   중복 확인
//                 </Button>
//               </Grid> */}
//             </Grid>
//           </Grid>
//           {/* <Grid item xs={12} className="category-container">
//             <Grid container direction="column">
//               <Grid item xs={12}>
//                 <h1>카테고리 설정</h1>
//               </Grid>
//               <Grid
//                 container
//                 direction="row"
//                 justify="center"
//                 spacing={2}
//                 xs={12}
//               >
//                 <Grid item xs={2}>
//                   <Button class="button" value="201" onClick={onCategoryChange}>
//                     수능
//                   </Button>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Button class="button" value="202" onClick={onCategoryChange}>
//                     취준
//                   </Button>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Button class="button" value="203" onClick={onCategoryChange}>
//                     자격증
//                   </Button>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Button class="button" value="204" onClick={onCategoryChange}>
//                     고시
//                   </Button>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Button class="button" value="205" onClick={onCategoryChange}>
//                     기타
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid
//               container
//               direction="row"
//               justify="center"
//               alignItems="center"
//               xs={12}
//             >
//               <Grid item xs={2}>
//                 <h1>회원 탈퇴</h1>
//               </Grid>
//               <Grid item xs={8}></Grid>
//               <Grid item xs={2}>
//                 <Button
//                   variant="outlined"
//                   style={{
//                     borderRadius: '1.25rem',
//                     color: 'white',
//                     fontWeight: 'bold',
//                     backgroundColor: '#CD0C22',
//                   }}
//                   onClick={handleClickOpen}
//                 >
//                   탈퇴하기
//                 </Button>
//                 <Dialog
//                   onClose={handleClose}
//                   aria-labelledby="customized-dialog-title"
//                   open={open}
//                 >
//                   <DialogTitle
//                     id="customized-dialog-title"
//                     onClose={handleClose}
//                   >
//                     회원 탈퇴
//                   </DialogTitle>
//                   <DialogContent dividers>
//                     <Typography gutterBottom>
//                       공부기록 등 그 외 사용자가 설정한 모든 정보가 사라지고,
//                       <br></br>
//                       복구가 불가능 합니다.
//                     </Typography>
//                     <Typography gutterBottom>
//                       그래도 탈퇴하시겠다면,
//                       <br></br>
//                       하단에 아이디를 한 번 더 입력해 주십시오.
//                     </Typography>
//                     <Grid item xs={12}>
//                       <Grid item xs={8}></Grid>
//                       <input
//                         type="text"
//                         style={{
//                           float: 'rignt',
//                         }}
//                       />
//                     </Grid>
//                   </DialogContent>
//                   <DialogActions>
//                     <Button
//                       autoFocus
//                       onClick={handleClose}
//                       style={{
//                         color: '#CD0C22',
//                       }}
//                     >
//                       탈퇴하기
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container direction="row" justify="center" spacing={2}>
//               <Grid item>
//                 <IconButton class="check" onClick={onClick}>
//                   <HowToRegIcon />
//                 </IconButton>
//               </Grid>
//               <Grid item>
//                 <IconButton class="cancel">
//                   <CancelIcon />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <h1>{nickname}</h1>
//             <h1>{category}</h1>
//           </Grid> */}
//         </Grid>
//       </Container>
//     </Wrapper>
//   );
// }
// export default DIRECTORSETTING;
