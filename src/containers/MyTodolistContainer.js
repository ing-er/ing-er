import { cloneElement } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTodolistAddContainer,
  setTodolistAddInput,
  setTodolistEditTitle,
  setTodolistEditContent,
  setTodolistEditComplete,
  setTodolistSaveData,
  setTodolistDeleteDetail,
  setTodolistDeleteTodolist,
} from '../modules/setTodolist';

const MyTodolistComponent = ({ children }) => {
  const dispatch = useDispatch();
  const { todolist } = useSelector((state) => state.setTodolist);
  const { todopercent } = useSelector((state) => state.setTodolist);
  const { requestdate } = useSelector((state) => state.setCalendar);
  const { isLightMode } = useSelector((state) => state.setLightMode);

  const setTodolistAddCon = (title) => {
    dispatch(setTodolistAddContainer(title));
  };
  const setTodolistAddInp = (index) => {
    dispatch(setTodolistAddInput(index));
  };
  const setTodolistEditTi = (index, title) => {
    dispatch(setTodolistEditTitle(index, title));
  };
  const setTodolistEditCon = (index, subindex, content) => {
    dispatch(setTodolistEditContent(index, subindex, content));
  };
  const setTodolistEditCompl = (index, subindex) => {
    dispatch(setTodolistEditComplete(index, subindex));
  };
  const setTodolistSave = () => {
    dispatch(setTodolistSaveData());
  };
  const setTodolistDeleteDt = (index, subindex) => {
    dispatch(setTodolistDeleteDetail(index, subindex));
  };
  const setTodolistDeleteTodo = (index) => {
    dispatch(setTodolistDeleteTodolist(index));
  };

  return cloneElement(children, {
    todolistdata: todolist,
    todopercent: todopercent,
    date: requestdate,
    isLightMode: isLightMode,
    setTodolistAddContainer: setTodolistAddCon,
    setTodolistAddInput: setTodolistAddInp,
    setTodolistEditTitle: setTodolistEditTi,
    setTodolistEditContent: setTodolistEditCon,
    setTodolistEditComplete: setTodolistEditCompl,
    setTodolistSaveData: setTodolistSave,
    setTodolistDeleteDetail: setTodolistDeleteDt,
    setTodolistDeleteTodolist: setTodolistDeleteTodo,
  });
};

export default MyTodolistComponent;
