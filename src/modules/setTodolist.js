export const ADDCONTAINER = "ADDCONTAINER";
export const ADDINPUT = "ADDINPUT";

export const setTodolistAddContainer = (title, todolist) => ({
  type: ADDCONTAINER,
  payload: title,
  todolist,
});

export const setTodolistAddInput = (index, todolist) => ({
  type: ADDINPUT,
  payload: index,
  todolist,
});

const initialState = {
  todolist: [
    {
      title: "국어",
      list: [
        { content: "국1", complete: false },
        { content: "국2", complete: false },
      ],
    },
    {
      title: "수학",
      list: [
        { content: "수1", complete: false },
        { content: "수2", complete: false },
      ],
    },
    {
      title: "영어",
      list: [
        { content: "영1", complete: false },
        { content: "영2", complete: false },
      ],
    },
  ],
};

const setTodolist = (state = initialState, action) => {
  switch (action.type) {
    case ADDCONTAINER:
      return {
        ...state,
        todolist: [
          ...state.todolist,
          {
            title: action.payload,
            list: [],
          },
        ],
      };
    case ADDINPUT:
      state.todolist[action.payload].list.push({
        content: "",
        complete: false,
      });
      return {
        ...state,
        todolist: [...state.todolist],
      };
    default:
      return state;
  }
};

export default setTodolist;
