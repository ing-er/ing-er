import { call, put, takeLatest } from 'redux-saga/effects';
import * as loginApi from '../api/auth/userAuthorization';

//* CREATE_REQUEST_ACTION_TYPES

//* AUTH_USER
const AUTH_USER = 'userAuthorization/AUTH_USER';
const AUTH_USER_SUCCESS = 'userAuthorization/AUTH_USER_SUCCESS';
const AUTH_USER_FAILURE = 'userAuthorization/AUTH_USER_FAILURE';

//* LOGIN_USER
const LOGIN_USER = 'userAuthorization/LOGIN_USER';
const LOGIN_USER_SUCCESS = 'userAuthorization/LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'userAuthorization/LOGIN_USER_FAILURE';

//* LOG_OUT_USER
const LOG_OUT_USER = 'userAuthorization/LOG_OUT_USER';

//* WITHDRAWAL_USER
const WITHDRAWAL_USER = 'userAuthorization/WITHDRAWAL_USER';
const WITHDRAWAL_USER_SUCCESS = 'userAuthorization/WITHDRAWAL_USER_SUCCESS';
const WITHDRAWAL_USER_FAILURE = 'userAuthorization/WITHDRAWAL_USER_FAILURE';

//* 회원가입을 마친 상태의 유저에게 올바른 상단바를 보여 주기 위한 변수
const COMPLETE_JOIN_USER = 'userAuthorization/COMPLETE_JOIN_USER';

const DIALOGOPEN = 'DIALOGOPEN';
const DIALOGCLOSE = 'DIALOGCLOSE';

const SETTING_INITIALIZE = 'userAuthorization/SETTING_INITIALIZE'

//* GENERATE_TYPE_FUNCTION
export const typeAuthUser = () => ({
  type: AUTH_USER,
});
export const typeLogin = (formData) => ({
  type: LOGIN_USER,
  payload: formData,
});
export const typeLogOut = () => ({
  type: LOG_OUT_USER,
});
export const typeCompleteJoinUser = () => ({
  type: COMPLETE_JOIN_USER,
});

export const typeWithdrawal = () => ({
  type: WITHDRAWAL_USER,
});
export const typeSettingInitialize = () => ({
  type: SETTING_INITIALIZE,
});

//* MAIN_SAGA_FUNCTION

export function* authSaga() {
  try {
    const authResult = yield call(loginApi.isAuthAsync);
    yield put({
      type: AUTH_USER_SUCCESS,
      payload: authResult
    });
  } catch (e) {
    yield put({
      type: AUTH_USER_FAILURE,
      payload: e,
    });
  }
}
export function* loginSaga(action) {
  try {
    const loginResult = yield call(loginApi.loginAsync, action.payload);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: loginResult,
    });
  } catch (e) {
    yield put({
      type: LOGIN_USER_FAILURE,
      payload: e,
    });
  }
}

export function* withdrawalSaga() {
  try {
    const withdrawalResult = yield call(loginApi.WithdrawalUserAsync);
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
export function* userAuthorizationSaga() {
  yield takeLatest(AUTH_USER, authSaga);
  yield takeLatest(LOGIN_USER, loginSaga);
  yield takeLatest(WITHDRAWAL_USER, withdrawalSaga);
}

export const setKakoDialogOpen = () => ({
  type: DIALOGOPEN,
});
export const setKakoDialogClose = () => ({
  type: DIALOGCLOSE,
});

const initialState = {
  id: 0,
};

//* REDUCER
export default function authorization(state=initialState, action) {
  switch (action.type) {
    //* =====================
    //*   AUTH_USER
    //* =====================
    case AUTH_USER:
      return {
        ...state,
      };
    case AUTH_USER_SUCCESS:
      //* 카카오 아이디가 없는 상태
      if (action.payload === 1) {
        return {
          isAuth: false,
          isJoin: false,
        }
      } else if (action.payload === 2) {
        //* 회원가입하려는 상태
        return {
          ...state,
          isAuth: true,
          isJoin: true,
          kakaoIdNum: action.kakaoIdNum,
        }
      } else {
        //* 로그인되어 있는 상태
        return {
          ...state,
          id: action.payload.id,
          userData: action.payload,
          info: action.payload,
          isAuth: true,
          isJoin: false,
          kakaoIdNum: action.kakaoIdNum,
        };
      };
    case AUTH_USER_FAILURE:
      return {
        ...state,
        isAuth: false,
        isJoin: false,
        error: action.payload.message,
      };

    //* =====================
    //*   LOGIN_USER
    //* =====================
    case LOGIN_USER:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS:
      //* 등록된 유저일 때,
      if (isNaN(action.payload)) {
        return {
          ...state,
          kakaoIdNum: Number(action.payload.kakaoIdNum),
          userData: action.payload,
          isAuth: true,
          isJoin: false,
        };
      }
      else {
        return {
          ...state,
          kakaoIdNum: action.payload,
          isJoin: true,
          isAuth: true,
        };
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuth: false,
        error: action.payload.message,
      };

    //* =====================
    //*   LOG_OUT_USER
    //* =====================
    case LOG_OUT_USER:
      return {
        ...state,
        isAuth: false,
        isJoin: false,
        userData: {},
      };

    //* =====================
    //*   WITHDRAWAL_USER
    //* =====================
      case WITHDRAWAL_USER:
      return {
        ...state,
      };
    case WITHDRAWAL_USER_SUCCESS:
      return {
        ...state,
        isAuth: false,
        isJoin: false,
        uinfo: action.payload,
      };
    case WITHDRAWAL_USER_FAILURE:
      return {
        ...state,
      };

      //* COMPLETE_JOIN_USER
    case COMPLETE_JOIN_USER:
      return {
        ...state,
        isAuth: true,
        isJoin: false,
      };
    case SETTING_INITIALIZE:
      return {
        ...state,
        setting: 0,
      };

    case DIALOGOPEN:
      return {
        ...state,
        isOpen: true,
      };
    case DIALOGCLOSE:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}
