import { all } from 'redux-saga/effects';
import { combineReducers } from "redux";
import setMainIndex from "./setMainIndex";
import setIsRandomRoom from "./setIsRandomRoom";
import memberSetting from './memberSetting';
import setTodolist from "./setTodolist";
import setCalendar from "./setCalendar";
import authorization, {userAuthorizationSaga} from "./userAuthorization";

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  memberSetting,
  setTodolist,
  setCalendar,
  authorization,
});

export function* rootSaga() {
  yield all([
    userAuthorizationSaga(),
  ]);
}

export default rootReducer;
