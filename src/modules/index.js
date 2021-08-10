import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import authorization, { userAuthorizationSaga } from './userAuthorization';
import setMainIndex from './setMainIndex';
import setIsRandomRoom from './setIsRandomRoom';
import memberSetting, { userInfoSaga } from './memberSetting';
import setTodolist from './setTodolist';
import setCalendar from './setCalendar';
import directorSetting, { adminSaga } from './directorSetting';
import timer from './timer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  setMainIndex,
  setIsRandomRoom,
  memberSetting,
  setTodolist,
  setCalendar,
  authorization,
  directorSetting,
  timer,
});

export function* rootSaga() {
  yield all([userAuthorizationSaga(), userInfoSaga(), adminSaga()]);
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
// export default rootReducer;
