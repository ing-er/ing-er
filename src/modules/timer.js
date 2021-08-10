const INCREASE = 'timer/INCREASE';

// action
export const increase = () => ({ type: INCREASE });

// initial state
const initialState = {
  timer: 0,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        timer: state.timer + 1
      }
    default:
      return state;
  }
};

export default timer;
