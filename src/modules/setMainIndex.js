export const CALENDAR = "CALENDAR";
export const TODOLIST = "TODOLIST";

export const setMainIndexCalendar = (mainIndex) => ({ type: CALENDAR, mainIndex });
export const setMainIndexTodolist = (mainIndex) => ({ type: TODOLIST, mainIndex });

const initialState = {
  mainIndex: 0,
};

const setMainIndex = (state = initialState, action) => {
  switch (action.type) {
    case CALENDAR:
      return {
        ...state,
        mainIndex: 0,
      };
    case TODOLIST:
      return {
        ...state,
        mainIndex: 1,
      };
    default:
      return state;
  }
};

export default setMainIndex;
