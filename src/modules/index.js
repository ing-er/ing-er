import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";
import memberSetting from './memberSetting';
import setTodolist from "./setTodolist";
import setCalendar from "./setCalendar";

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  memberSetting,
  setTodolist,
  setCalendar,
});

export default rootReducer;
