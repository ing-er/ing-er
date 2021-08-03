import { call, put, takeLatest } from 'redux-saga/effects';
import * as editApi from '../api/auth/memberSetting';


//* GET_USER_INFO
const GET_USER_INFO = 'memberSetting/GET_USER_INFO';
const GET_USER_INFO_SUCCESS = 'memberSetting/GET_USER_INFO_SUCCESS';
const GET_USER_INFO_FAILURE = 'memberSetting/GET_USER_INFO_FAILURE';

//* GET_USER_INFO
const CHECK_USER_NICKNAME = 'memberSetting/CHECK_USER_NICKNAME';
const CHECK_USER_NICKNAME_SUCCESS = 'memberSetting/CHECK_USER_NICKNAME_SUCCESS';
const CHECK_USER_NICKNAME_FAILURE = 'memberSetting/CHECK_USER_NICKNAME_FAILURE';

//* POST_UPDATE_USER_INFO
const POST_UPDATE_USER_INFO = 'userEdit/POST_UPDATE_USER_INFO';
const POST_UPDATE_USER_INFO_SUCCESS = 'userEdit/POST_UPDATE_USER_INFO_SUCCESS';
const POST_UPDATE_USER_INFO_FAILURE = 'userEdit/POST_UPDATE_USER_INFO_FAILURE';

//* INIT_UPDATE_INFO
const INIT_USER_INFO = 'userEdit/INIT_UPDATE_INFO';
const INIT_USER_INFO_SUCCESS = 'userEdit/INIT_UPDATE_INFO_SINIT_USER_INFO_SUCCESS';
const INIT_USER_INFO_FAILURE = 'userEdit/INIT_UPDATE_INFO_FAILURE';

//* GENERATE_TYPE_FUNCTION
export const typeGetUserInfo = () => ({
  type: GET_USER_INFO,
});

export const typeCheckUserNickname = (data) => ({
  type: CHECK_USER_NICKNAME,
  payload: data,
});

export const typeUpdateUserInfo = (data) => ({
  type: POST_UPDATE_USER_INFO,
  payload: data,
});

export const typeInitInfo = (data) => ({
  type: INIT_USER_INFO,
  payload: data,
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

export function* checkUserNicknameSaga(action) {
  try {
    const result = yield call(editApi.checkUserNicknameAsync, action.payload);
    yield put({
      type: CHECK_USER_NICKNAME_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: CHECK_USER_NICKNAME_FAILURE,
      payload: e,
    });
  }
}

export function* registUserInfoSaga(action) {
  try {
    const result = yield call(editApi.registUserInfoAsync, action.payload);
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
    const result = yield call(editApi.postUserUpdateAsync, action.payload);
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

//* WATCHER_SAGA_FUNCTION
export function* userInfoSaga() {
  yield takeLatest(GET_USER_INFO, getUserInfoSaga);
  yield takeLatest(CHECK_USER_NICKNAME, checkUserNicknameSaga);
  yield takeLatest(INIT_USER_INFO, registUserInfoSaga);
  yield takeLatest(POST_UPDATE_USER_INFO, updateUserInfoSaga);
}

//* 초기 state
const initialState = {
  info: {},
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function memberSetting(state = initialState, action) {
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

    //*   CHECK_USER_NICKNAME
    case CHECK_USER_NICKNAME:
      return {
        ...state,
      };
    case CHECK_USER_NICKNAME_SUCCESS:
      return {
        ...state,
        isduplicated: false
      };
    case CHECK_USER_NICKNAME_FAILURE:
      return {
        ...state,
        isduplicated: true,
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
      };
    case INIT_USER_INFO_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}