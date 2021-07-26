import { useSelector, useDispatch } from "react-redux";
import { setTodolistAddContainer, setTodolistAddInput } from "../modules/setTodolist";

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

  return (
    <MyTodolist
      todolistdata={todolist}
      setTodolistAddContainer={setTodolistAddCon}
      setTodolistAddInput={setTodolistAddInp}
    />
  );
};

export default MyTodolistComponent;
