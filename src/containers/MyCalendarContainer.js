import { useSelector, useDispatch } from 'react-redux';
import {
  setCalendarEditPromise,
  setCalendarEditDiary,
  setCalendarEditPromiseIsEditable,
  setCalendarEditDiaryIsEditable,
  setCalendarSetDate,
  setCalendarSaveData,
  getCalendarData,
} from '../modules/setCalendar';
import { setTodolistSetDate } from '../modules/setTodolist';

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
  const setCalendarSave = () => {
    dispatch(setCalendarSaveData());
  };
  const setTodolistSetdt = (date) => {
    dispatch(setTodolistSetDate(date));
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
      setCalendarSaveData={setCalendarSave}
      setTodolistSetDate={setTodolistSetdt}
    />
  );
};

export default MyCalendarComponent;
