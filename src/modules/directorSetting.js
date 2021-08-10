import { call, put, takeLatest } from 'redux-saga/effects';
import * as adminApi from '../api/admin/adminSetting';


//* GET_USER_INFO
const GET_USER_INFO_A = 'directorSetting/GET_USER_INFO_A';
const GET_USER_INFO_A_SUCCESS = 'directorSetting/GET_USER_INFO_A_SUCCESS';
const GET_USER_INFO_A_FAILURE = 'directorSetting/GET_USER_INFO_A_FAILURE';

//* POST_USER_CODE
const POST_USER_CODE = 'directorSetting/POST_USER_CODE';
const POST_USER_CODE_SUCCESS = 'directorSetting/POST_USER_CODE_SUCCESS';
const POST_USER_CODE_FAILURE = 'directorSetting/POST_USER_CODE_FAILURE';

//* INIT_UPDATE_INFO
const INIT_UPDATE_INFO = 'userEdit/INIT_UPDATE_INFO';

//* GENERATE_TYPE_FUNCTION
export const typeGetUserInfo = (data) => ({
  type: GET_USER_INFO_A,
	payload: data,
});

export const typePostUserCode = (data) => ({
  type: POST_USER_CODE,
	payload: data,
});

export const typeInitUpdateInfo = () => ({
  type: INIT_UPDATE_INFO,
});

//* MAIN_SAGA_FUNCTION

export function* getUserInfoSaga(data) {
  try {
    const result = yield call(adminApi.getUserInfoAsync, data.payload);
    yield put({
      type: GET_USER_INFO_A_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: GET_USER_INFO_A_FAILURE,
      payload: e,
    });
  }
}

export function* postUserCodeSaga(data) {
	console.log('data')
	console.log(data)
  try {
    const result = yield call(adminApi.updateUserCodeAsync, data.payload);
    yield put({
      type: POST_USER_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: POST_USER_CODE_FAILURE,
      payload: e,
    });
  }
}

//* WATCHER_SAGA_FUNCTION
export function* adminSaga() {
  yield takeLatest(GET_USER_INFO_A, getUserInfoSaga);
  yield takeLatest(POST_USER_CODE, postUserCodeSaga);
}

//* 초기 state
const initialState = {
  users: {},
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function directorSetting(state = initialState, action) {
	// console.log('reducer')
	// console.log(state)
	// console.log(action.payload)

  switch (action.type) {
    //*   GET_USER_INFO
    case GET_USER_INFO_A:
      return {
        ...state,
      };
    case GET_USER_INFO_A_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_INFO_A_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case POST_USER_CODE:
      return {
        ...state,
      };
    case POST_USER_CODE_SUCCESS:
      return {
        ...state,
        updateSuccess: action.payload,
      };
    case POST_USER_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case INIT_UPDATE_INFO:
      return {
        ...state,
        updateSuccess: {},
      };

    default:
      return state;
  }
}