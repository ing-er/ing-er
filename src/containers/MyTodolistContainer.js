import { useSelector, useDispatch } from "react-redux";
import {
  setTodolistAddContainer,
  setTodolistAddInput,
  setTodolistEditTitle,
  setTodolistEditContent,
} from "../modules/setTodolist";

import MyTodolist from "../components/Main/MyTodolist";

const MyTodolistComponent = () => {
  const dispatch = useDispatch();
  const { todolist } = useSelector((state) => state.setTodolist);
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

  return (
    <MyTodolist
      todolistdata={todolist}
      setTodolistAddContainer={setTodolistAddCon}
      setTodolistAddInput={setTodolistAddInp}
      setTodolistEditTitle={setTodolistEditTi}
      setTodolistEditContent={setTodolistEditCon}
    />
  );
};

export default MyTodolistComponent;
