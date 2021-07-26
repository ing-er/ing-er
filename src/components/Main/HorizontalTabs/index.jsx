import { Tabs, Tab, Container, Button, Grid, Switch, FormControlLabel, Box } from '@material-ui/core';
import Wrapper from './styles';
import MyCalendar from '../MyCalendar';
import MyTodolist from '../MyTodolist';
import { withStyles } from '@material-ui/styles';

import { useSelector, useDispatch } from "react-redux";
import { setMainIndexCalendar, setMainIndexTodolist } from '../../../modules/setMainIndex';
import { setIsRandomRoomTrue, setIsRandomRoomFalse } from '../../../modules/setIsRandomRoom';

const TabsOrange = withStyles({
    indicator: {
        background: '#E96F02'
    }
})(Tabs);

export default function HorizontalTabs() {
    const dispatch = useDispatch();
    const { mainIndex } = useSelector(state => state.setMainIndex);
    const { isRandomRoom } = useSelector(state => state.setIsRandomRoom);

    const labels = ['Calendar', 'Todo-list'];

    const handleTabChange = (event, newValue) => {
        if (newValue == 0) {
            dispatch(setMainIndexCalendar());
        } else if (newValue == 1) {
            dispatch(setMainIndexTodolist());
        }
    };

    const handleSwitchChange = (event, newValue) => {
        if (newValue === true) {
            dispatch(setIsRandomRoomTrue());
        } else {
            dispatch(setIsRandomRoomFalse());
        }
    };

    return (
        <Wrapper>
            <Container className="tab-container"
                style={{
                    alignItems: 'center'
                }}>
                <Grid container justify="space-between">
                    <Grid item>
                    <TabsOrange orientation="horizontal"
                variant="scrollable"
                            className="tabs"
                            value={mainIndex}
                            onChange={handleTabChange}>
            {labels.map((x, index) => {
                return (
                    <Tab
                        key={index}
                        label={x}
                        style={{
                            fontWeight: 'bold',
                            color: index === mainIndex ? '#E96F02' : 'white'
                        }}
                    />
                )
            })
            }
                </TabsOrange>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Switch checked={isRandomRoom} onChange={handleSwitchChange} style={{ color: '#E96F02' }} />}
                            labelPlacement="top"
                            label={
                                <Box component="div" fontSize={12}>
                                    랜덤방
                                </Box>
                            }/>                        
                    <Button
                    className="enter-button"
                    variant="outlined"
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                    backgroundColor: '#E96F02'
                }}>
                    입장하기
                </Button>
                    </Grid>
                </Grid>
            </Container>
            {mainIndex === 0 && (
                <Container
                style={{
                alignItems: 'center'
            }}>
                <MyCalendar />
            </Container>
            )}
            {mainIndex === 1 && (
                <Container
                style={{
                alignItems: 'center'
            }}>
                <MyTodolist />
                </Container>
            )}
        </Wrapper>
    );
};