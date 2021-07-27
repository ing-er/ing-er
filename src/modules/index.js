import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";
import memberSetting from './memberSetting';

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  memberSetting,
});

export default rootReducer;
