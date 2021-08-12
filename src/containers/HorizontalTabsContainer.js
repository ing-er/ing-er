import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setMainIndexCalendar,
  setMainIndexTodolist,
} from '../modules/setMainIndex';
import {
  setIsRandomRoomTrue,
  setIsRandomRoomFalse,
} from '../modules/setIsRandomRoom';
import { getCalendarData, setCalendarSetDate } from '../modules/setCalendar';
import { getTodolistData, setTodolistSetDate } from '../modules/setTodolist';

import HorizontalTabs from '../components/Main/HorizontalTabs';

//* 민코
// import MemberSetting from '../components/Entrance/MemberSetting';
import { typeAuthUser } from '../modules/userAuthorization';

const HorizontalTabsComponent = () => {
  const dispatch = useDispatch();
  const { mainIndex } = useSelector((state) => state.setMainIndex);
  const setMainIndexCal = () => {
    dispatch(setMainIndexCalendar());
  };
  const setMainIndexTodo = () => {
    dispatch(setMainIndexTodolist());
  };

  const { isRandomRoom } = useSelector((state) => state.setIsRandomRoom);
  const setIsRandomRoomT = () => {
    dispatch(setIsRandomRoomTrue());
  };
  const setIsRandomRoomF = () => {
    dispatch(setIsRandomRoomFalse());
  };

  // const { id } = useSelector(({authorization}) => authorization.info.id);
  // const { id } = useSelector((state) => state.authorization.userData);
  const { id } = useSelector(({ authorization }) => ({
    id: authorization.userData.id,
  }));

  const { requestdate } = useSelector((state) => state.setTodolist);

  useEffect(() => {
    typeAuthUser();
  }, []);
  useEffect(async () => {
    await getCalendarData(id);
    console.log('getCalendarData 완료');
    await getTodolistData(id);
    console.log('getTodolistData 완료');
    console.log('requestdate : ' + requestdate);
    await dispatch(setCalendarSetDate(requestdate));
    await dispatch(setTodolistSetDate(requestdate));
  }, []);

  return (
    <HorizontalTabs
      mainIndex={mainIndex}
      setMainIndexCalendar={setMainIndexCal}
      setMainIndexTodolist={setMainIndexTodo}
      isRandomRoom={isRandomRoom}
      setIsRandomRoomTrue={setIsRandomRoomT}
      setIsRandomRoomFalse={setIsRandomRoomF}
    />
  );
};

export default HorizontalTabsComponent;
