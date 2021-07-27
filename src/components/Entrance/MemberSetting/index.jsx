import React from "react";
import Wrapper from "./styles";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Container,
  IconButton,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import CancelIcon from "@material-ui/icons/Cancel";

function MemberSetting({
  nickname,
  category,
  diffNickname,
  diffCategory,
  onSetDiffNickname,
  onSetDiffCategory,
  onSetting,
}) {
  const onNicknameChange = (e) => {
    // onSetNickname(e.target.value);
    onSetDiffNickname(e.target.value);
  };
  const onCategoryChange = (e) => {
    // onSetNickname(e.target.value);
    console.log(e.currentTarget.value);
    onSetDiffCategory(parseInt(e.currentTarget.value, 10));
  };

  // const classes = useStyles();

  return (
    <Wrapper>
      <Container
        className="all-container"
        style={{
          alignItems: "center",
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
                    <input
                      className="nickname-input"
                      value={diffNickname}
                      onChange={onNicknameChange}
                    />
                    {/* <TextField
                      className="nickname-input"
                      type="nickname" value={diffNickname} onChange={onNicknameChange} /> */}
                    {/* <TextField id="input-with-icon-grid" label="With a grid" /> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "1.25rem",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "#E96F02",
                  }}
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
                  <Button class="button" value="201" onClick={onCategoryChange}>
                    수능
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button class="button" value="202" onClick={onCategoryChange}>
                    취준
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button class="button" value="203" onClick={onCategoryChange}>
                    자격증
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button class="button" value="204" onClick={onCategoryChange}>
                    고시
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button class="button" value="205" onClick={onCategoryChange}>
                    기타
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" justify="center" spacing={2}>
              <Grid item>
                <IconButton class="check" onClick={onSetting}>
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
          <Grid item xs={12}>
            <h1>{nickname}</h1>
            <h1>{category}</h1>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}
export default MemberSetting;
