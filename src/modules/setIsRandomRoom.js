export const RANDOMTRUE = "RANDOMTRUE";
export const RANDOMFALSE = "RANDOMFALSE";

export const setIsRandomRoomTrue = (isRandomRoom) => ({ type: RANDOMTRUE, isRandomRoom });
export const setIsRandomRoomFalse = (isRandomRoom) => ({ type: RANDOMFALSE, isRandomRoom });

const initialState = {
  isRandomRoom: false,
};

const setIsRandomRoom = (state = initialState, action) => {
  switch (action.type) {
    case RANDOMTRUE:
      return {
        ...state,
        isRandomRoom: true,
      };
    case RANDOMFALSE:
      return {
        ...state,
        isRandomRoom: false,
      };
    default:
      return state;
  }
};

export default setIsRandomRoom;
