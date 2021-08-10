const INCREASE = 'studyTime/INCREASE';

// action
export const increase = () => ({ type: INCREASE });

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
    default:
      return state;
  }
};

export default studyTime;
