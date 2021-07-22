import { Tabs, Tab, Container, Button, Grid, Divider } from '@material-ui/core';
import Wrapper from './styles';
import MyCalendar from '../MyCalendar';
import MyTodolist from '../MyTodolist';

export default function HorizontalTabs() {
    const labels = ['Calendar', 'Todo-list'];
    return (
        <Wrapper>
            <Container className="tab-container"
                style={{
                    alignItems: 'center'
                }}>
                <Grid container justify="space-between">
                    <Grid item>
                    <Tabs orientation="horizontal"
                variant="scrollable"
            className="tabs">
            {labels.map((x, index) => {
                return (
                    <Tab
                        key={index}
                        label={x}
                        style={{
                            fontWeight: 'bold',
                            color: index === 0 ? '#E96F02' : 'white'
                        }}
                    />
                )
            })
            }
                </Tabs>
                    </Grid>
                    <Grid item>
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
            <Container
                style={{
                alignItems: 'center'
            }}>
                <MyCalendar />
            </Container>
            <Divider/>
            <Container
                style={{
                alignItems: 'center'
            }}>
                <MyTodolist />
                </Container>
        </Wrapper>
    );
};