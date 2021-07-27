import React from 'react'
import Wrapper from './styles';
import {
  Button,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CancelIcon from '@material-ui/icons/Cancel';

function Introduce( { nickname, category, diffNickname, diffCategory, onSetDiffNickname, onSetDiffCategory, onSetting} ){

  const onNicknameChange = e => {
    // onSetNickname(e.target.value);
    onSetDiffNickname(e.target.value);
  };
  const onCategoryChange = e => {
    // onSetNickname(e.target.value);
    console.log(e.target.value)
    onSetDiffCategory(parseInt(e.target.value, 10));
  };

  // const classes = useStyles();
  
  return (
      <Wrapper>
      <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              className="sign-up4-grid"
          >
              <Grid item xs={3} />
              <h1>닉네임</h1>
              <Grid item xs={5}>
                <Typography align="center" className="sign-up4-grid-item-typography">
                  <div class="d-flex">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2}>
                        <AccountCircle />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField type="nickname" value={diffNickname} onChange={onNicknameChange} label="With a grid" />
                        {/* <TextField id="input-with-icon-grid" label="With a grid" /> */}
                      </Grid>
                    </Grid>
                  </div>
                  </Typography>
              </Grid>
              <Grid >
                <Button variant="contained">중복 확인</Button>
              </Grid>
              
          </Grid>

          <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              className="sign-up4-grid"
          >
            <Grid item xs={12} sm={6}>
                카테고리 설정
                <Grid>
                  <Button class="button" value="201" onClick={onCategoryChange}>수능</Button>
                  <Button class="button" value="202" onClick={onCategoryChange}>
                    취준
                  </Button>
                  <Button class="button" value="203" onClick={onCategoryChange}>
                    자격증
                  </Button>
                  <Button class="button" value="204" onClick={onCategoryChange}>
                    고시
                  </Button>
                  <Button class="button" value="205" onClick={onCategoryChange}>
                    기타
                  </Button>
                </Grid>
            </Grid>
          </Grid>
          <Button class="check" onClick={onSetting}>
            <HowToRegIcon />
          </Button>
          <Button class="cancel">
            <CancelIcon />
          </Button>
          <h1>{nickname}</h1>
          <h1>{category}</h1>
      </Wrapper>
    );
}
export default Introduce;