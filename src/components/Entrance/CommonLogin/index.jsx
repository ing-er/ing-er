import React from 'react';
import {
  TextField,
  withStyles,
  makeStyles,
  IconButton,
  createStyles,
} from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const styles = (theme) =>
  createStyles({
    root: {
      '& .MuiFormLabel-root': {
        color: 'red',
      },
    },
  });

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
      fontFamily: 'bold',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
        color: 'white',
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

const textStyles = makeStyles((theme) => ({
  input: {
    color: 'white',
  },
  label: {
    color: 'white',
  },
}));

const CommonLogin = ({
  uniqueNumber,
  setUniqueNumber,
  onPressUniqueNumber,
}) => {
  const classes = textStyles();

  return (
    <div>
      <CssTextField
        type="number"
        style={{
          margin: '0px 20px 20px',
        }}
        label="입장 번호 입력"
        value={uniqueNumber}
        InputProps={{
          className: classes.input,
        }}
        InputLabelProps={{
          className: classes.label,
        }}
        onChange={(e) => {
          setUniqueNumber(e.target.value);
        }}
      />
      <IconButton
        style={{
          color: 'black',
          background: '#ffeb00',
          // padding: '10px',
          borderRadius: '3rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          transform: 'translateY(4px)',
          border: '0',
          outline: '0',
        }}
        onClick={onPressUniqueNumber}
      >
        <HowToRegIcon />
      </IconButton>
    </div>
  );
};

export default CommonLogin;
