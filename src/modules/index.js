import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import authorization, { userAuthorizationSaga } from './userAuthorization';
import setMainIndex from './setMainIndex';
import setIsRandomRoom from './setIsRandomRoom';
import memberSetting, { userInfoSaga } from './memberSetting';
import setTodolist from './setTodolist';
import setCalendar from './setCalendar';
import setTimer from './setTimer';

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  memberSetting,
  setTodolist,
  setCalendar,
  authorization,
  setTimer,
});

export function* rootSaga() {
  yield all([userAuthorizationSaga(), userInfoSaga()]);
}

export default rootReducer;
