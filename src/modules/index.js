import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";
import setTodolist from "./setTodolist";
import setCalendar from "./setCalendar";

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  setTodolist,
  setCalendar,
});

export default rootReducer;
