import { AppBar, Button, Grid, Icon, IconButton, Typography, useMediaQuery } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsIcon from '@material-ui/icons/Settings';
import Wrapper from './styles';

const Header = () => {
  const isTablet = useMediaQuery('(max-width:960px)');
  return (
    <>
      <Wrapper>
      
    <AppBar
          position="fixed"
          className='appbar'
        >
          <Grid container justify="space-between" alignItems="center"
          className='header-grid'>
            <Grid item>
              <Typography
                variant="h6"
                className="logo"
              >
                Ing er
              </Typography>
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
                    <InfoIcon htmlColor="white"/>
                  </IconButton>
                </Grid>
                
                <Grid item>
                {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    마이페이지
                  </Button> */}
                  <IconButton>
                    <AccountCircleIcon htmlColor="white"/>
                  </IconButton>
                </Grid>
                
                <Grid item>
                {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    방
                  </Button> */}
                  <IconButton>
                      <MeetingRoomIcon htmlColor="white"/>
                    </IconButton>
                  </Grid>
                
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                
                  <Grid item>
                  {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    로그인
                  </Button> */}
                  <IconButton>
                    <LockIcon htmlColor="white"/>
                  </IconButton>
                </Grid>
                
                  <Grid item>
                  {/* <Button
                    variant="text"
                    className="display-none header-button"
                  >
                    설정
                  </Button> */}
                  <IconButton>
                    <SettingsIcon htmlColor="white"/>
                  </IconButton>
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