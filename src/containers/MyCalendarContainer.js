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
  const { requestcalendar } = useSelector((state) => state.setCalendar);
  const { requestdate } = useSelector((state) => state.setCalendar);
  const { isEditablePromise } = useSelector((state) => state.setCalendar);
  const { isEditableDiary } = useSelector((state) => state.setCalendar);

  return (
    <MyCalendar
      calendardata={requestcalendar}
      requestdate={requestdate}
      isEditablePromise={isEditablePromise}
      isEditableDiary={isEditableDiary}
      setCalendarEditPromise={setCalendarEditPro}
      setCalendarEditDiary={setCalendarEditDi}
      setCalendarEditPromiseIsEditable={setCalendarEditPromiseIsEdit}
      setCalendarEditDiaryIsEditable={setCalendarEditDiaryIsEdit}
      setCalendarSetDate={setCalendarSetDt}
    />
  );
};

export default MyCalendarComponent;
