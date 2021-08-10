import React from 'react';

import DirectorSettingTable from './DirectorSettingTable';

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
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  table: {
    minWidth: 650,
  },
}));

//* 회원 코드 변경 */
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const kindsOfCode = ['일반 회원', '제재 회원', '관리자'];

const numToAlpha = {
  101: '일반 회원',
  102: '관리자',
  103: '제재 회원',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: '#292A33',
      color: 'white',
    },
  },
};

//***************************** */

//************공통 코드 관리 ***********************//

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

//**************************************************//

const DIRECTORSETTING = ({
  onSearchUser,
  name,
  originUsercode,
  usercode,
  handleCode,
  updateUsercode,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <Wrapper>
      <Container clssName="main-container">
        <Grid container spacing={2} className="container">
          <Grid className="contents-container header">
            <Grid>
              <h1>회원 권한 변경</h1>
            </Grid>
            <Grid>
              <Grid>
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
                        onKeyPress={onSearchUser}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </div>
                  </Toolbar>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="contents-container">
            <Grid className="infos-container">
              <Grid className="infos-item">
                <p>닉네임</p>
              </Grid>
              <Grid className="infos-item">
                <p>현재 유저 코드</p>
              </Grid>
              <Grid className="infos-item">
                <p>코드 변경</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="contents-container">
            <Grid className="infos-container">
              <Grid className="infos-item">
                <p>{name}</p>
              </Grid>
              <Grid className="infos-item">
                <p>{numToAlpha[originUsercode]}</p>
              </Grid>
              <Grid className="infos-item">
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={numToAlpha[usercode]}
                    onChange={handleCode}
                    input={<Input style={{ color: 'white' }} />}
                    MenuProps={MenuProps}
                  >
                    {kindsOfCode.map((code) => (
                      <MenuItem
                        key={code}
                        value={code}
                        style={getStyles(code, personName, theme)}
                      >
                        {code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="contents-container update-button-container">
            <IconButton className="check" onClick={updateUsercode}>
              <HowToRegIcon />
            </IconButton>
          </Grid>
          <Grid className="contents-container managament-container">
            <Grid>
              <h1>공통 코드 관리</h1>
            </Grid>
            <Grid className="add-button-container">
              <Button
                variant="outlined"
                style={{
                  borderRadius: '1.25rem',
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor: '#292A33',
                  marginRight: '1rem',
                }}
                onClick={handleClickOpen}
              >
                공통코드 추가
              </Button>
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
                세부코드 추가
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
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
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
          <Grid className="contents-container">
            <Grid container spacing={5} className="my-table-container">
              <Grid
                item
                xs={12}
                sm={6}
                className="my-table-item"
              >
                <DirectorSettingTable />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                className="my-table-item"
              >
                <DirectorSettingTable />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default DIRECTORSETTING;
