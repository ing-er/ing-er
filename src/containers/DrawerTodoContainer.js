import { cloneElement, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTodolistAddContainer,
  setTodolistAddInput,
  setTodolistEditTitle,
  setTodolistEditContent,
  setTodolistEditComplete,
  setTodolistSaveData,
  getTodolistData,
} from '../modules/setTodolist';

const DrawerTodoContainer = ({ children }) => {
  const dispatch = useDispatch();
  const { todolist } = useSelector((state) => state.setTodolist);
  const { todopercent } = useSelector((state) => state.setTodolist);
  const { requestdate } = useSelector((state) => state.setCalendar);
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

  console.log('todolist');
  console.log(todolist);
  return cloneElement(children, {
    todolistdata: todolist,
    todopercent: todopercent,
    date: requestdate,
    setTodolistAddContainer: setTodolistAddCon,
    setTodolistAddInput: setTodolistAddInp,
    setTodolistEditTitle: setTodolistEditTi,
    setTodolistEditContent: setTodolistEditCon,
    setTodolistEditComplete: setTodolistEditCompl,
    setTodolistSaveData: setTodolistSave,
  });
};

export default DrawerTodoContainer;
