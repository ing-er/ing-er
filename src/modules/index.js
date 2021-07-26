import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
});

export default rootReducer;
