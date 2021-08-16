import { useState, useEffect } from 'react';

import { setCalendarBackground } from '../../../../../utils/calendar';

import { Container } from '@material-ui/core';
import Calendar from 'react-calendar';
import './Calendar.css';
import dayjs from 'dayjs';
import Wrapper from './styles';

const CalendarComponent = ({ handleRemoteRequestdate }) => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth() + 1);
  const [remoteCalendarList, setRemoteCalendarList] = useState([]);

  useEffect(() => {
    setCalendarBackground(remoteCalendarList);
  }, [activeMonth, remoteCalendarList]);

  const handleChange = ({ activeStartDate }) => {
    const _activeMonth = activeStartDate.getMonth() + 1;
    setActiveMonth(_activeMonth);
  }

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
      >
        <Calendar
          className="calendar"
          onChange={handleRemoteRequestdate}
          onActiveStartDateChange={handleChange}
          calendarType="US"
          formatDay={(locale, date) => formatDate(locale, date)}
        />
      </Container>
    </Wrapper>
  );
};

export default CalendarComponent;
