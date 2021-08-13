import { Container } from '@material-ui/core';
import Calendar from 'react-calendar';
import '../Calendar.css';
import dayjs from 'dayjs';

import Wrapper from './styles';

const CalendarComponent = (props) => {
  let { setCalendarSetDate, setTodolistSetDate, isLightMode } = props;
  const onChangeDate = (value, event) => {
    let year = value.getFullYear();
    let month = ('0' + (value.getMonth() + 1)).slice(-2);
    let day = ('0' + value.getDate()).slice(-2);
    // console.log(year + '-' + month + '-' + day);
    setCalendarSetDate(year + '-' + month + '-' + day);
    setTodolistSetDate(year + '-' + month + '-' + day);
  };

  const changeCalendarShadow = () => {
    if (isLightMode) {
      return '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
    }
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
      <Container
        className="calendar-container"
        style={{ boxShadow: changeCalendarShadow() }}
      >
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
