import { TextField, Grid, Container, IconButton } from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Wrapper from './styles';

const MyCalendar = (props) => {
    let { calendardata, setCalendarEditPromise, setCalendarEditDiary, setCalendarEditPromiseIsEditable, setCalendarEditDiaryIsEditable } = props;
    const onChangePromiseHandler = (e) => {
        setCalendarEditPromise(e.target.value);
    };
    const onChangeDiaryHandler = (e) => {
        setCalendarEditDiary(e.target.value);
    };
    const onClickPromiseHandler = () => {
        setCalendarEditPromiseIsEditable();
    };
    const onClickDiaryHandler = () => {
        setCalendarEditDiaryIsEditable();
    };
    console.log(calendardata);
    return (
        <Wrapper>
            <Grid container
                className="all-container"
                direction="row"
                style={{
                backgroundColor: '#292A33'
                }}>
                <Grid item xs={12} sm={6}>
                    <Grid container
                        direction="column"
                    spacing={2}>
                        <Grid item
                            style={{
                                fontSize: 25
                        }}>
                            7월 20일 (화)
                        </Grid>
                        <Grid item>
                            오늘의 공부 시간
                        </Grid>
                        <Grid item
                            style={{
                            fontSize: 40
                        }}>
                            01 : 53 : 05
                        </Grid>
                        <Grid item>
                            <Container className="calendar-container">
                                <Calendar className="calendar"/>
                                </Container>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container
                        direction="column"
                    spacing={2}>
                        <Grid item>
                        <Grid container
                            direction="column"
                            alignItems="center"
                            >
                                <Grid item
                                    style={{
                                        fontSize: 20
                                }}>
                                나의 오늘 다짐
                            </Grid>
                                <Grid item
                                    className="textfield-grid"
                                    style={{
                                        backgroundColor:'white'
                                    }}>
                                    <IconButton onClick={onClickPromiseHandler}>
                                        <SettingsApplicationsIcon/>
                                    </IconButton>
                                <TextField
                                    multiline={true}
                                    rows={8}
                                        fullWidth
                                        defaultValue={calendardata.promise.content}
                                        onChange={onChangePromiseHandler}
                                        disabled={!calendardata.promise.isEditable}
                                    />
                            </Grid>
                        </Grid>
                        </Grid>
                        <Grid item>
                        <Grid container
                                direction="column"
                            alignItems="center"
                            >
                                <Grid item
                                    style={{
                                        fontSize: 20
                                }}>
                                나의 오늘 일기
                                </Grid>
                            <Grid item
                                    className="textfield-grid"
                                    style={{
                                        backgroundColor:'white'
                                    }}>
                                    <IconButton onClick={onClickDiaryHandler}>
                                        <SettingsApplicationsIcon/>
                                    </IconButton>
                                <TextField
                                    multiline={true}
                                    rows={8}
                                        fullWidth
                                        defaultValue={calendardata.diary.content}
                                        onChange={onChangeDiaryHandler}
                                        disabled={!calendardata.diary.isEditable}
                                    />
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default MyCalendar;