import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DrawerContentContainer from '../components/Room/DrawerContentContainer';
import { getCalendarData, setCalendarSetDate } from '../modules/setCalendar';
import { getTodolistData, setTodolistSetDate } from '../modules/setTodolist';

const DrawerContainer = (props) => {
  let { drawerId } = props;
  const dispatch = useDispatch();
  const { id } = useSelector(({ authorization }) => ({
    id: authorization.userData.id,
  }));
  const { requestdate } = useSelector((state) => state.setTodolist);
  useEffect(async () => {
    await getCalendarData(id);
    console.log('getCalendarData 완료');
    await getTodolistData(id);
    console.log('getTodolistData 완료');
    console.log('requestdate : ' + requestdate);
    await dispatch(setCalendarSetDate(requestdate));
    await dispatch(setTodolistSetDate(requestdate));
  }, []);

  return <DrawerContentContainer drawerId={drawerId} />;
};

export default DrawerContainer;
