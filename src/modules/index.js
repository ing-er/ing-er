import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";
import introduce from './introduce';

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  introduce,
});

export default rootReducer;
