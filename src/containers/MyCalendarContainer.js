import { useSelector, useDispatch } from 'react-redux';
import {
  setCalendarEditPromise,
  setCalendarEditDiary,
  setCalendarEditPromiseIsEditable,
  setCalendarEditDiaryIsEditable,
  setCalendarSetDate,
} from '../modules/setCalendar';

import MyCalendar from '../components/Main/MyCalendar';

const MyCalendarComponent = () => {
  const dispatch = useDispatch();
  const setCalendarEditPro = (promise) => {
    dispatch(setCalendarEditPromise(promise));
  };
  const setCalendarEditDi = (diary) => {
    dispatch(setCalendarEditDiary(diary));
  };
  const setCalendarEditPromiseIsEdit = () => {
    dispatch(setCalendarEditPromiseIsEditable());
  };
  const setCalendarEditDiaryIsEdit = () => {
    dispatch(setCalendarEditDiaryIsEditable());
  };
  const setCalendarSetDt = (date) => {
    dispatch(setCalendarSetDate(date));
  };
  const { calendar } = useSelector((state) => state.setCalendar);

  return (
    <MyCalendar
      calendardata={calendar}
      setCalendarEditPromise={setCalendarEditPro}
      setCalendarEditDiary={setCalendarEditDi}
      setCalendarEditPromiseIsEditable={setCalendarEditPromiseIsEdit}
      setCalendarEditDiaryIsEditable={setCalendarEditDiaryIsEdit}
      setCalendarSetDate={setCalendarSetDt}
    />
  );
};

export default MyCalendarComponent;
