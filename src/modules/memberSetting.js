import { call, put, takeLatest } from 'redux-saga/effects';
import * as editApi from '../api/auth/memberSetting';


//* GET_USER_INFO
const GET_USER_INFO = 'memberSetting/GET_USER_INFO';
const GET_USER_INFO_SUCCESS = 'memberSetting/GET_USER_INFO_SUCCESS';
const GET_USER_INFO_FAILURE = 'memberSetting/GET_USER_INFO_FAILURE';

//* POST_UPDATE_USER_INFO
const POST_UPDATE_USER_INFO = 'memberSetting/POST_UPDATE_USER_INFO';
const POST_UPDATE_USER_INFO_SUCCESS = 'memberSetting/POST_UPDATE_USER_INFO_SUCCESS';
const POST_UPDATE_USER_INFO_FAILURE = 'memberSetting/POST_UPDATE_USER_INFO_FAILURE';

//* INIT_UPDATE_INFO
const INIT_USER_INFO = 'memberSetting/INIT_UPDATE_INFO';
const INIT_USER_INFO_SUCCESS = 'memberSetting/INIT_UPDATE_INFO_SINIT_USER_INFO_SUCCESS';
const INIT_USER_INFO_FAILURE = 'memberSetting/INIT_UPDATE_INFO_FAILURE';

//* WITHDRAWAL_USER
const WITHDRAWAL_USER = 'memberSetting/WITHDRAWAL_USER';
const WITHDRAWAL_USER_SUCCESS = 'memberSetting/WITHDRAWAL_USER_SUCCESS';
const WITHDRAWAL_USER_FAILURE = 'memberSetting/WITHDRAWAL_USER_FAILURE';

const INIT_STATE = 'memberSetting/INIT_STATE';

//* GENERATE_TYPE_FUNCTION
export const typeGetUserInfo = () => ({
  type: GET_USER_INFO,
});

export const typeUpdateUserInfo = (data) => ({
  type: POST_UPDATE_USER_INFO,
  payload: data,
});

export const typeInitInfo = (data) => ({
  type: INIT_USER_INFO,
  payload: data,
});

export const typeWithdrawal = () => ({
  type: WITHDRAWAL_USER,
});

export const typeInitialize = () => ({
  type: INIT_STATE,
});

//* MAIN_SAGA_FUNCTION

export function* getUserInfoSaga() {
  try {
    const result = yield call(editApi.getUserInfoAsync);
    yield put({
      type: GET_USER_INFO_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: GET_USER_INFO_FAILURE,
      payload: e,
    });
  }
}

export function* registUserInfoSaga(action) {
  try {
    const result = yield call(editApi.registUserInfoAsync, action.payload);
    console.log('reg result')
    console.log(result)
    yield put({
      type: INIT_USER_INFO_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: INIT_USER_INFO_FAILURE,
      payload: e,
    });
  }
}

export function* updateUserInfoSaga(action) {
  try {
    const result = yield call(editApi.editUserInfoAsync, action.payload);
    yield put({
      type: POST_UPDATE_USER_INFO_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: POST_UPDATE_USER_INFO_FAILURE,
      payload: e,
    });
  }
}

export function* withdrawalSaga() {
  try {
    const withdrawalResult = yield call(editApi.WithdrawalUserAsync);
    yield put({
      type: WITHDRAWAL_USER_SUCCESS,
      payload: withdrawalResult,
    });
  } catch (e) {
    yield put({
      type: WITHDRAWAL_USER_FAILURE,
      payload: e,
    });
  }
}

//* WATCHER_SAGA_FUNCTION
export function* userInfoSaga() {
  yield takeLatest(GET_USER_INFO, getUserInfoSaga);
  yield takeLatest(INIT_USER_INFO, registUserInfoSaga);
  yield takeLatest(POST_UPDATE_USER_INFO, updateUserInfoSaga);
  yield takeLatest(WITHDRAWAL_USER, withdrawalSaga);
}

//* 초기 state
const initialState = {
  info: {},
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function memberSetting(state = initialState, action) {
  console.log('mem func')
  console.log(state)
  console.log(action)
  
  switch (action.type) {
    //*   GET_USER_INFO
    case GET_USER_INFO:
      return {
        ...state,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        info: action.payload,
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case POST_UPDATE_USER_INFO:
      return {
        ...state,
      };
    case POST_UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        update: action.payload,
      };
    case POST_UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case INIT_USER_INFO:
    return {
      ...state,
      };
    case INIT_USER_INFO_SUCCESS:
      return {
        ...state,
        update: action.payload,
      };
    case INIT_USER_INFO_FAILURE:
      return {
        ...state,
      };

      case WITHDRAWAL_USER:
      return {
        ...state,
      };
    case WITHDRAWAL_USER_SUCCESS:
      return {
        ...state,
        info: {},
      };
    case WITHDRAWAL_USER_FAILURE:
      return {
        ...state,
      };
    
    case INIT_STATE:
      return {
        ...state,
        update: {}
      };

    default:
      return state;
  }
}