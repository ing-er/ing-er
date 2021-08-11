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

import DrawerProfile from '../components/Room/DrawerContentContainer/DrawerProfile';

const DrawerProfileContainer = () => {
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
  const { studyTime } = useSelector((state) => state.studyTime);

  return (
    <DrawerProfile
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
      studyTime={studyTime}
    />
  );
};

export default DrawerProfileContainer;
