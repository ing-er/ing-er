export const ADDCONTAINER = 'ADDCONTAINER';
export const ADDINPUT = 'ADDINPUT';
export const EDITTITLE = 'EDITTITLE';
export const EDITCONTENT = 'EDITCONTENT';
export const EDITCOMPLETE = 'EDITCOMPLETE';

export const setTodolistAddContainer = (title, todolist) => ({
  type: ADDCONTAINER,
  payload: title,
  todolist,
});

export const setTodolistAddInput = (index, todolist, todopercent) => ({
  type: ADDINPUT,
  payload: index,
  todolist,
  todopercent,
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

export const setTodolistEditComplete = (
  index,
  subindex,
  todolist,
  todopercent,
) => ({
  type: EDITCOMPLETE,
  payload: {
    index: index,
    subindex: subindex,
  },
  todolist,
  todopercent,
});

const initialState = {
  todolist: [
    {
      title: '국어',
      list: [
        { content: '국1', complete: false },
        { content: '국2', complete: false },
      ],
    },
    {
      title: '수학',
      list: [
        { content: '수1', complete: false },
        { content: '수2', complete: false },
      ],
    },
    {
      title: '영어',
      list: [
        { content: '영1', complete: false },
        { content: '영2', complete: false },
      ],
    },
  ],
  todototal: 6,
  todocomplete: 0,
  todopercent: 0,
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
        content: '',
        complete: false,
      });
      state.todototal++;
      state.todopercent = (state.todocomplete / state.todototal) * 100;
      return {
        ...state,
        todolist: [...state.todolist],
        todopercent: state.todopercent,
      };
    case EDITTITLE:
      state.todolist[action.payload.index].title = action.payload.title;
      return {
        ...state,
        todolist: [...state.todolist],
      };
    case EDITCONTENT:
      state.todolist[action.payload.index].list[
        action.payload.subindex
      ].content = action.payload.content;
      return {
        ...state,
        todolist: [...state.todolist],
      };
    case EDITCOMPLETE:
      state.todolist[action.payload.index].list[
        action.payload.subindex
      ].complete =
        !state.todolist[action.payload.index].list[action.payload.subindex]
          .complete;
      if (
        state.todolist[action.payload.index].list[action.payload.subindex]
          .complete === true
      ) {
        state.todocomplete++;
      } else {
        state.todocomplete--;
      }
      state.todopercent = (state.todocomplete / state.todototal) * 100;
      return {
        ...state,
        todolist: [...state.todolist],
        todopercent: state.todopercent,
      };
    default:
      return state;
  }
};

export default setTodolist;
