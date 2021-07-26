import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";
import setTodolist from "./setTodolist";

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  setTodolist,
});

export default rootReducer;
