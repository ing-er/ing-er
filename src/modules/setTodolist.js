import axios from 'axios';

export const ADDCONTAINER = 'ADDCONTAINER';
export const ADDINPUT = 'ADDINPUT';
export const EDITTITLE = 'EDITTITLE';
export const EDITCONTENT = 'EDITCONTENT';
export const EDITCOMPLETE = 'EDITCOMPLETE';
export const SAVETODOLIST = 'SAVETODOLIST';

const HOST = 'localhost:8080';
const serverUrl = `http://${HOST}/api/v1`;

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

export const setTodolistSaveData = () => ({
  type: SAVETODOLIST,
});

const initialState = {
  todolist: [],
  todototal: 0,
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
            id: -1,
            title: action.payload,
            isChanged: false,
            list: [],
          },
        ],
      };
    case ADDINPUT:
      state.todolist[action.payload].list.push({
        id: -1,
        content: '',
        complete: false,
        isChanged: false,
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
      state.todolist[action.payload.index].isChanged = true;
      return {
        ...state,
        todolist: [...state.todolist],
      };
    case EDITCONTENT:
      state.todolist[action.payload.index].list[
        action.payload.subindex
      ].content = action.payload.content;
      state.todolist[action.payload.index].list[
        action.payload.subindex
      ].isChanged = true;
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
    case SAVETODOLIST:
      let updateTodolist = [];
      let updateTodolistDetail = [];
      let createTodolist = [];
      let createTodolistDetail = [];
      state.todolist.map((todo, index) => {
        if (todo.id === -1) {
          let detailList = [];
          todo.list.map((data, idx) => {
            if (data.id === -1) {
              detailList.push({
                detail: data.content,
              });
            }
          });
          createTodolist.push({
            date: todo.date,
            todo: todo.title,
            todoindex: todo.id,
            detail: detailList,
            userId: 1,
          });
        } else {
          if (todo.isChanged === true) {
            updateTodolist.push({
              id: 1,
              todo: todo.title,
              todoindex: todo.id,
            });
          }
          todo.list.map((data, idx) => {
            if (data.id === -1) {
              createTodolistDetail.push({
                detail: data.content,
                todoId: todo.id,
              });
            } else if (data.isChanged === true) {
              updateTodolistDetail.push({
                detail: data.content,
                id: 1,
                isFinish: data.complete,
              });
            }
          });
        }
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default setTodolist;
