import { useSelector, useDispatch } from "react-redux";
import { setMainIndexCalendar, setMainIndexTodolist } from "../modules/setMainIndex";
import { setIsRandomRoomTrue, setIsRandomRoomFalse } from "../modules/setIsRandomRoom";

import HorizontalTabs from "../components/Main/HorizontalTabs";

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
