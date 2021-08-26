import { call, put, takeLatest } from 'redux-saga/effects';
import * as loginApi from '../api/auth/userAuthorization';

//* CREATE_REQUEST_ACTION_TYPES

//* AUTH_USER
// 회원 검증
const AUTH_USER = 'userAuthorization/AUTH_USER';
const AUTH_USER_SUCCESS = 'userAuthorization/AUTH_USER_SUCCESS';
const AUTH_USER_FAILURE = 'userAuthorization/AUTH_USER_FAILURE';

//* LOGIN_USER
// 로그인
const LOGIN_USER = 'userAuthorization/LOGIN_USER';
const LOGIN_USER_SUCCESS = 'userAuthorization/LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'userAuthorization/LOGIN_USER_FAILURE';

//* TEST_LOGIN_USER
// 인증 코드 유저
const TEST_LOGIN_USER = 'userAuthorization/TEST_LOGIN_USER';
const TEST_LOGIN_USER_SUCCESS = 'userAuthorization/TEST_LOGIN_USER_SUCCESS';
const TEST_LOGIN_USER_FAILURE = 'userAuthorization/TEST_LOGIN_USER_FAILURE';

//* LOG_OUT_USER
// 로그아웃
const LOG_OUT_USER = 'userAuthorization/LOG_OUT_USER';

//* WITHDRAWAL_USER
// 탈퇴
const WITHDRAWAL_USER = 'userAuthorization/WITHDRAWAL_USER';
const WITHDRAWAL_USER_SUCCESS = 'userAuthorization/WITHDRAWAL_USER_SUCCESS';
const WITHDRAWAL_USER_FAILURE = 'userAuthorization/WITHDRAWAL_USER_FAILURE';

// 상태값 초기화
const INIT_STATE = 'userAuthorization/INIT_STATE';

// 카카오 dialog
const DIALOGOPEN = 'DIALOGOPEN';
const DIALOGCLOSE = 'DIALOGCLOSE';

//* GENERATE_TYPE_FUNCTION
export const typeAuthUser = () => ({
  type: AUTH_USER,
});
export const typeLogin = (formData) => ({
  type: LOGIN_USER,
  payload: formData,
});
export const typeTestLogin = (formData) => ({
  type: TEST_LOGIN_USER,
  payload: formData,
});
export const typeLogOut = () => ({
  type: LOG_OUT_USER,
});

export const typeWithdrawal = () => ({
  type: WITHDRAWAL_USER,
});

export const typeInitState = () => ({
  type: INIT_STATE,
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

export function* testLoginSaga(action) {
  try {
    const loginResult = yield call(loginApi.testLoginAsync, action.payload);
    yield put({
      type: TEST_LOGIN_USER_SUCCESS,
      payload: loginResult,
    });
  } catch (e) {
    yield put({
      type: TEST_LOGIN_USER_FAILURE,
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
  yield takeLatest(TEST_LOGIN_USER, testLoginSaga);
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
          isAdmin: false,
        }
      } else if (action.payload === 2) {
        //* 회원가입하려는 상태
        return {
          ...state,
          isAuth: true,
          isJoin: true,
          isAdmin: false,
        }
      } else {
        if (action.payload.usercode === 2){
          //* 로그인되어 있는 상태(관리자)
          return {
            ...state,
            id: action.payload.id,          // id값은 별도로 빼서 다른 컨테이너에서 사용.
            userData: action.payload,       // 들어온 유저 정보 저장. 닉, 카테고리, 공개여부, 유저코드, 
            isAuth: true,
            isJoin: false,
            isAdmin: true,
          };
        } else {
          //* 로그인되어 있는 상태(일반 회원)
          return {
            ...state,
            id: action.payload.id,
            userData: action.payload,
            isAuth: true,
            isJoin: false,
            isAdmin: false,
          };
        }
      };
    case AUTH_USER_FAILURE:
      return {
        ...state,
        isAuth: false,
        isJoin: false,
        isAdmin: false,
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
      if (isNaN(action.payload)) {            // 로그인할 때, 존재하지 않는 회원인 경우에 nan이 들어옴.
        if (action.payload.usercode === 2){
          //* 로그인되어 있는 상태(관리자)
          return {
            ...state,
            id: action.payload.id,
            userData: action.payload,
            isAuth: true,
            isJoin: false,
            isAdmin: true,
          };
        } else {
          //* 로그인되어 있는 상태(일반 회원)
          return {
            ...state,
            id: action.payload.id,
            userData: action.payload,
            isAuth: true,
            isJoin: false,
            isAdmin: false,
          };
        };
      }
      else {
        return {          // 회원가입하려는 회원은 nan을 받는다.
          ...state,
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

    case TEST_LOGIN_USER:
      return {
        ...state,
      };
    case TEST_LOGIN_USER_SUCCESS:
      if(action.payload == 'fail') {
        return {
          ...state,
          loginError: true,                   // 유저 코드로 접속했을 때 fail값을 받으면 loginError상태를 만들어줌.
                                              // 애초에 회원가입할 때 디비에 없는 접속 번호면 error 코드가 아니라, success를 상태 코드를 주기 때문에,
                                              // 이와 같은 조치가 필요해졌음.
        };
      } else {
        if (action.payload.usercode === 2){
          //* 로그인되어 있는 상태(관리자)
          return {
            ...state,
            id: action.payload.id,
            userData: action.payload,
            isAuth: true,
            isJoin: false,
            isAdmin: true,
          };
        } else {
          return {
            ...state,
            id: action.payload.id,
            userData: action.payload,
            isAuth: true,
            isJoin: false,
            isAdmin: false,
          };
        };
      }

    case TEST_LOGIN_USER_FAILURE:
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
        isAdmin: false,
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
        userData: {},
        isAuth: false,
        isJoin: false,
        withdrawalSuccess: action.payload,      // 회원탈퇴 성공 메시지를 받으면 useEffect로 효과를 줄 거임.
      };
    case WITHDRAWAL_USER_FAILURE:
      return {
        ...state,
      };

    case INIT_STATE:            // 받은 상태 값 중, 다른 액션 진행에 방해되는 state값이 존재하지 않도록 초기화.
      return {
        ...state,
        loginError: false,
        withdrawalSuccess: {},
      };

    case DIALOGOPEN:            // 카카오 로그인 다이얼로그와 관련된 액션.
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
