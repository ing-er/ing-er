export const ADDCONTAINER = "ADDCONTAINER";
export const ADDINPUT = "ADDINPUT";
export const EDITTITLE = "EDITTITLE";
export const EDITCONTENT = "EDITCONTENT";
export const EDITCOMPLETE = "EDITCOMPLETE";

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

export const setTodolistEditTitle = (index, title, todolist) => ({
  type: EDITTITLE,
  payload: {
    title: title,
    index: index,
  },
  todolist,
});

export const setTodolistEditContent = (index, subindex, content, todolist) => ({
  type: EDITCONTENT,
  payload: {
    index: index,
    subindex: subindex,
    content: content,
  },
  todolist,
});

export const setTodolistEditComplete = (index, subindex, todolist) => ({
  type: EDITCOMPLETE,
  payload: {
    index: index,
    subindex: subindex,
  },
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
    case EDITTITLE:
      state.todolist[action.payload.index].title = action.payload.title;
      return {
        ...state,
        todolist: [...state.todolist],
      };
    case EDITCONTENT:
      state.todolist[action.payload.index].list[action.payload.subindex].content =
        action.payload.content;
      return {
        ...state,
        todolist: [...state.todolist],
      };
    case EDITCOMPLETE:
      state.todolist[action.payload.index].list[action.payload.subindex].complete =
        !state.todolist[action.payload.index].list[action.payload.subindex].complete;
      return {
        ...state,
        todolist: [...state.todolist],
      };
    default:
      return state;
  }
};

export default setTodolist;
