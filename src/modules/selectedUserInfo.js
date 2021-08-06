/* action type */
const SET_SELECTEDUSERINFO = 'selectedUserInfo/SET_SELECTEDUSERINFO';

/* action */
export const setSelectedUserInfo = (userId) => ({
  type: SET_SELECTEDUSERINFO,
  userId,
});

/* initial state */
const initialState = {
  userId: 'defaultUserId',
  name: 'defaultUsername',
};

/* reducer */
const selectedUserInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTEDUSERINFO:
      return {
        ...state,
        userId: action.userId
      };
    default:
      return state;
  }
};

export default selectedUserInfo;
