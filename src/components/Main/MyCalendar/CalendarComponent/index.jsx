import {
  TextField,
  Grid,
  Container,
  IconButton,
  Button,
} from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Calendar from 'react-calendar';
import '../Calendar.css';
import dayjs from 'dayjs';

import Wrapper from './styles';

const CalendarComponent = (props) => {
  let { setCalendarSetDate, setTodolistSetDate } = props;
  const onChangeDate = (value, event) => {
    let year = value.getFullYear();
    let month = ('0' + (value.getMonth() + 1)).slice(-2);
    let day = ('0' + value.getDate()).slice(-2);
    // console.log(year + '-' + month + '-' + day);
    setCalendarSetDate(year + '-' + month + '-' + day);
    setTodolistSetDate(year + '-' + month + '-' + day);
  };

  const formatDate = (locale, date) => {
    let day = dayjs(date).format('DD');
    if (day.charAt(0) === '0') {
      day = day.slice(1);
    }
    return day;
  };

  return (
    <Wrapper>
      <Container className="calendar-container">
        <Calendar
          className="calendar"
          onChange={onChangeDate}
          calendarType="US"
          formatDay={(locale, date) => formatDate(locale, date)}
        />
      </Container>
    </Wrapper>
  );
};

export default CalendarComponent;
