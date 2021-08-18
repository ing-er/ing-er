const INCREASE = 'studyTime/INCREASE';
const SETSTUDYTIME = 'studyTime/SETSTUDYTIME';

// action
export const increase = () => ({ type: INCREASE });
export const setReduxStudyTime = (time) => ({ type: SETSTUDYTIME, payload: time });

// initial state
const initialState = {
  studyTime: 0,
};

const studyTime = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        studyTime: state.studyTime + 1
      }
    case SETSTUDYTIME:
      return {
        studyTime: action.payload,
      }
    default:
      return state;
  }
};

export default studyTime;
