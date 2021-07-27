/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFFNICKNAME = 'memberSetting/SET_DIFFNICKNAME';
const SET_DIFFCATEGORY = 'memberSetting/SET_DIFFCATEGORY';
const SETTING = 'memberSetting/SETTING';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiffNickname = diffNickname => ({ type: SET_DIFFNICKNAME, diffNickname });
export const setDiffCategory = diffCategory => ({ type: SET_DIFFCATEGORY, diffCategory });
export const setting = () => ({ type: SETTING });

/* 초기 상태 선언 */
const initialState = {
  nickname: '',
  category: 0,
  diffNickname: '',
  diffCategory: 0,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function memberSetting(state = initialState, action) {
  switch (action.type) {
    case SET_DIFFNICKNAME:
      return {
        ...state,
        diffNickname: action.diffNickname
      };
    case SET_DIFFCATEGORY:
      return {
        ...state,
        diffCategory: action.diffCategory
      };
    case SETTING:
      return {
        ...state,
        nickname: state.diffNickname,
        category: state.diffCategory
      };
    default:
      return state;
  }
}