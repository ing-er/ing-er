import { cloneElement } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTodolistAddContainer,
  setTodolistAddInput,
  setTodolistEditTitle,
  setTodolistEditContent,
  setTodolistEditComplete,
} from '../modules/setTodolist';

const MyTodolistComponent = ({ children }) => {
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

  return cloneElement(children, {
    todolistdata: todolist,
    todopercent: todopercent,
    date: requestdate,
    setTodolistAddContainer: setTodolistAddCon,
    setTodolistAddInput: setTodolistAddInp,
    setTodolistEditTitle: setTodolistEditTi,
    setTodolistEditContent: setTodolistEditCon,
    setTodolistEditComplete: setTodolistEditCompl,
  });
};

export default MyTodolistComponent;
