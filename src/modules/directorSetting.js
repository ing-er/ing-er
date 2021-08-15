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

//* GET_COMMON_CODE
const GET_COMMON_CODE = 'directorSetting/GET_COMMON_CODE';
const GET_COMMON_CODE_SUCCESS = 'directorSetting/GET_COMMON_CODE_SUCCESS';
const GET_COMMON_CODE_FAILURE = 'directorSetting/GET_COMMON_CODE_FAILURE';

//* DELETE_COMMON_CODE
const DELETE_COMMON_CODE = 'directorSetting/DELETE_COMMON_CODE';
const DELETE_COMMON_CODE_SUCCESS = 'directorSetting/DELETE_COMMON_CODE_SUCCESS';
const DELETE_COMMON_CODE_FAILURE = 'directorSetting/DELETE_COMMON_CODE_FAILURE';

//* UPDATE_COMMON_CODE
const UPDATE_COMMON_CODE = 'directorSetting/UPDATE_COMMON_CODE';
const UPDATE_COMMON_CODE_SUCCESS = 'directorSetting/UPDATE_COMMON_CODE_SUCCESS';
const UPDATE_COMMON_CODE_FAILURE = 'directorSetting/UPDATE_COMMON_CODE_FAILURE';

//* PATCH_COMMON_CODE
const PATCH_COMMON_CODE = 'directorSetting/PATCH_COMMON_CODE';
const PATCH_COMMON_CODE_SUCCESS = 'directorSetting/PATCH_COMMON_CODE_SUCCESS';
const PATCH_COMMON_CODE_FAILURE = 'directorSetting/PATCH_COMMON_CODE_FAILURE';

//* GET_DETAIL_CODE
const GET_DETAIL_CODE = 'directorSetting/GET_DETAIL_CODE';
const GET_DETAIL_CODE_SUCCESS = 'directorSetting/GET_DETAIL_CODE_SUCCESS';
const GET_DETAIL_CODE_FAILURE = 'directorSetting/GET_DETAIL_CODE_FAILURE';

//* DELETE_DETAIL_CODE
const DELETE_DETAIL_CODE = 'directorSetting/DELETE_DETAIL_CODE';
const DELETE_DETAIL_CODE_SUCCESS = 'directorSetting/DELETE_DETAIL_CODE_SUCCESS';
const DELETE_DETAIL_CODE_FAILURE = 'directorSetting/DELETE_DETAIL_CODE_FAILURE';

//* UPDATE_DETAIL_CODE
const UPDATE_DETAIL_CODE = 'directorSetting/UPDATE_DETAIL_CODE';
const UPDATE_DETAIL_CODE_SUCCESS = 'directorSetting/UPDATE_DETAIL_CODE_SUCCESS';
const UPDATE_DETAIL_CODE_FAILURE = 'directorSetting/UPDATE_DETAIL_CODE_FAILURE';

//* INIT_UPDATE_INFO
const INIT_UPDATE_INFO = 'userEdit/INIT_UPDATE_INFO';

//* GENERATE_TYPE_FUNCTION
//* user seearch
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

//* common code
export const typeGetCommonCode = () => ({
  type: GET_COMMON_CODE,
});

export const typeDeleteCommonCode = (data) => ({
  type: DELETE_COMMON_CODE,
	payload: data,
});

export const typeUpdateteCommonCode = (data) => ({
  type: UPDATE_COMMON_CODE,
	payload: data,
});

export const typePatchCommonCode = (data) => ({
  type: PATCH_COMMON_CODE,
	payload: data,
});

//* detail code
export const typeGetDetailCode = () => ({
  type: GET_DETAIL_CODE,
});

export const typeDeleteDetailCode = (data) => ({
  type: DELETE_DETAIL_CODE,
	payload: data,
});

export const typeUpdateteDetailCode = (data) => ({
  type: UPDATE_DETAIL_CODE,
	payload: data,
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

//* COMMON CODE
export function* getCommonCodeSaga() {
  try {
    const result = yield call(adminApi.getCommonCodeAsync);
    yield put({
      type: GET_COMMON_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: GET_COMMON_CODE_FAILURE,
      payload: e,
    });
  }
}

export function* deleteCommonCodeSaga(data) {
  try {
    const result = yield call(adminApi.deleteCommonCodeAsync, data.payload);
    yield put({
      type: DELETE_COMMON_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: DELETE_COMMON_CODE_FAILURE,
      payload: e,
    });
  }
}

export function* updateCommonCodeSaga(data) {
  try {
    const result = yield call(adminApi.updateCommonCodeAsync, data.payload);
    yield put({
      type: UPDATE_COMMON_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: UPDATE_COMMON_CODE_FAILURE,
      payload: e,
    });
  }
}

export function* patchCommonCodeSaga(data) {
  try {
    const result = yield call(adminApi.patchCommonCodeAsync, data.payload);
    yield put({
      type: PATCH_COMMON_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: PATCH_COMMON_CODE_FAILURE,
      payload: e,
    });
  }
}

//* DETAIL CODE
export function* getDetailCodeSaga() {
  try {
    const result = yield call(adminApi.getDetailCodeAsync);
    yield put({
      type: GET_DETAIL_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: GET_DETAIL_CODE_FAILURE,
      payload: e,
    });
  }
}

export function* deleteDetailCodeSaga(data) {
  try {
    const result = yield call(adminApi.deleteDetailCodeAsync, data.payload);
    yield put({
      type: DELETE_DETAIL_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: DELETE_DETAIL_CODE_FAILURE,
      payload: e,
    });
  }
}

export function* updateDetailCodeSaga(data) {
  try {
    const result = yield call(adminApi.updateDetailCodeAsync, data.payload);
    yield put({
      type: UPDATE_DETAIL_CODE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: UPDATE_DETAIL_CODE_FAILURE,
      payload: e,
    });
  }
}

//* WATCHER_SAGA_FUNCTION
export function* adminSaga() {
  yield takeLatest(GET_USER_INFO_A, getUserInfoSaga);
  yield takeLatest(POST_USER_CODE, postUserCodeSaga);
  yield takeLatest(GET_COMMON_CODE, getCommonCodeSaga);
  yield takeLatest(DELETE_COMMON_CODE, deleteCommonCodeSaga);
  yield takeLatest(UPDATE_COMMON_CODE, updateCommonCodeSaga);
  yield takeLatest(PATCH_COMMON_CODE, patchCommonCodeSaga);
  yield takeLatest(GET_DETAIL_CODE, getDetailCodeSaga);
  yield takeLatest(DELETE_DETAIL_CODE, deleteDetailCodeSaga);
  yield takeLatest(UPDATE_DETAIL_CODE, updateDetailCodeSaga);
}

//* 초기 state
const initialState = {
  users: {},
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function directorSetting(state = initialState, action) {
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
				users: {},
        error: action.payload,
        user_error: true,
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

    case GET_COMMON_CODE:
      return {
        ...state,
      };
    case GET_COMMON_CODE_SUCCESS:
      return {
        ...state,
        commonCode: action.payload,
      };
    case GET_COMMON_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_COMMON_CODE:
      return {
        ...state,
      };
    case DELETE_COMMON_CODE_SUCCESS:
      return {
        ...state,
        deleteCommonCodeSuccess: action.payload,
      };
    case DELETE_COMMON_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_COMMON_CODE:
      return {
        ...state,
      };
    case UPDATE_COMMON_CODE_SUCCESS:
      return {
        ...state,
        updateCommonCodeSuccess: action.payload,
      };
    case UPDATE_COMMON_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case PATCH_COMMON_CODE:
      return {
        ...state,
      };
    case PATCH_COMMON_CODE_SUCCESS:
      return {
        ...state,
        patchCommonCodeSuccess: action.payload,
      };
    case PATCH_COMMON_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DETAIL_CODE:
      return {
        ...state,
      };
    case GET_DETAIL_CODE_SUCCESS:
      return {
        ...state,
        detailCode: action.payload,
      };
    case GET_DETAIL_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_DETAIL_CODE:
      return {
        ...state,
      };
    case DELETE_DETAIL_CODE_SUCCESS:
      return {
        ...state,
        deleteDetailCodeSuccess: action.payload,
      };
    case DELETE_DETAIL_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_DETAIL_CODE:
      return {
        ...state,
      };
    case UPDATE_DETAIL_CODE_SUCCESS:
      return {
        ...state,
        updateDetailCodeSuccess: action.payload,
      };
    case UPDATE_DETAIL_CODE_FAILURE:
      return {
        ...state,
        updateDetailError: 'fail',
      };

    case INIT_UPDATE_INFO:
      return {
        ...state,
        users: {},
        user_error: false,
        updateSuccess: {},
        deleteCommonCodeSuccess: {},
        updateCommonCodeSuccess: {},
        deleteDetailCodeSuccess: {},
        updateDetailCodeSuccess: {},
        error: {},
        updateDetailError: {}
      };

    default:
      return state;
  }
}