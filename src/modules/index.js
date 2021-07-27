import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";
import introduce from './introduce';
import setTodolist from "./setTodolist";
import setCalendar from "./setCalendar";

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  introduce,
  setTodolist,
  setCalendar,
});

export default rootReducer;
