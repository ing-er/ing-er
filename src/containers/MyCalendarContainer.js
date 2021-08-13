import { useSelector, useDispatch } from 'react-redux';
import {
  setCalendarEditPromise,
  setCalendarEditDiary,
  setCalendarEditPromiseIsEditable,
  setCalendarEditDiaryIsEditable,
  setCalendarSetDate,
  setCalendarSaveData,
} from '../modules/setCalendar';
import { setTodolistSetDate } from '../modules/setTodolist';

import MyCalendar from '../components/Main/MyCalendar';
import Swal from 'sweetalert2';

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
  const setCalendarSave = async () => {
    await dispatch(setCalendarSaveData());
    await Swal.fire({
      title:
        '<span style="color: white">' +
        requestdate +
        '\n다짐, 일기가 저장되었습니다. <span>',
      icon: 'success',
      background: '#292A33',
      confirmButtonColor: '#E96F02',
      confirmButtonText: 'OK!',
    });
  };
  const setTodolistSetdt = (date) => {
    dispatch(setTodolistSetDate(date));
  };
  const { requestcalendar } = useSelector((state) => state.setCalendar);
  const { requestdate } = useSelector((state) => state.setCalendar);
  const { isEditablePromise } = useSelector((state) => state.setCalendar);
  const { isEditableDiary } = useSelector((state) => state.setCalendar);
  const { isLightMode } = useSelector((state) => state.setLightMode);

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
      isLightMode={isLightMode}
    />
  );
};

export default MyCalendarComponent;
