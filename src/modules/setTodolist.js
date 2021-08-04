import axios from 'axios';

export const ADDCONTAINER = 'ADDCONTAINER';
export const ADDINPUT = 'ADDINPUT';
export const EDITTITLE = 'EDITTITLE';
export const EDITCONTENT = 'EDITCONTENT';
export const EDITCOMPLETE = 'EDITCOMPLETE';
export const SAVETODOLIST = 'SAVETODOLIST';
export const SETDATE = 'TODOLIST/SETDATE';

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

export const setTodolistSetDate = (date) => ({
  type: SETDATE,
  payload: date,
});

let todolistData = [];
let todolistToday = [];
let todolistComplete = 0;
let todolistTotal = 0;
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let todaydate = year + '-' + month + '-' + day;

async function getTodolistData() {
  await axios
    .get(serverUrl + '/todoList/select/' + 1)
    .then((res) => {
      res.data.map((x, index) => {
        let todolistDetail = [];
        x.detail.map((y, idx) => {
          todolistTotal++;
          if (y.isFinish === true) {
            todolistComplete++;
          }
          todolistDetail.push({
            id: y.id,
            todoidx: index,
            detailidx: idx,
            content: y.detail,
            complete: y.isFinish,
            isChanged: false,
          });
        });
        todolistData.push({
          id: x.id,
          todoidx: index,
          date: x.date,
          title: x.todo,
          isChanged: false,
          list: todolistDetail,
        });
        if (x.date === todaydate) {
          todolistToday.push(todolistData[index]);
        }
      });
      console.log('load 완료..');
    })
    .catch((err) => {
      console.log(err);
    });
}

getTodolistData();

const initialState = {
  allTodolist: todolistData,
  todolist: todolistToday,
  todototal: todolistTotal,
  todocomplete: todolistComplete,
  todopercent:
    todolistTotal === 0 ? 0 : (todolistComplete / todolistTotal) * 100,
  requestdate: todaydate,
};

const setTodolist = (state = initialState, action) => {
  console.log('allTodolist');
  console.log(state.allTodolist);
  console.log('todolist');
  console.log(state.todolist);
  switch (action.type) {
    case ADDCONTAINER:
      let len = state.allTodolist.length;
      state.allTodolist.push({
        id: -1,
        todoidx: len,
        title: action.payload,
        isChanged: true,
        date: state.requestdate,
        list: [],
      });
      state.todolist.push(state.allTodolist[len]);
      return {
        ...state,
        todolist: state.todolist,
      };
    case ADDINPUT:
      let idx = state.todolist[action.payload].todoidx;
      let listlen = state.todolist[action.payload].list.length;
      let todolistIdx = state.allTodolist.map((x) => x.todoidx).indexOf(idx);
      console.log('todolistIdx : ' + todolistIdx);
      state.allTodolist[todolistIdx].list.push({
        id: -1,
        todoidx: idx,
        detailidx: listlen,
        content: '',
        complete: false,
        isChanged: true,
      });
      state.todototal++;
      state.todopercent = (state.todocomplete / state.todototal) * 100;
      return {
        ...state,
        todolist: state.todolist,
        todopercent: state.todopercent,
      };
    case EDITTITLE:
      state.todolist[action.payload.index].title = action.payload.title;
      state.todolist[action.payload.index].isChanged = true;
      return {
        ...state,
        todolist: state.todolist,
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
        todolist: state.todolist,
      };
    case EDITCOMPLETE:
      state.todolist[action.payload.index].list[
        action.payload.subindex
      ].complete =
        !state.todolist[action.payload.index].list[action.payload.subindex]
          .complete;
      state.todolist[action.payload.index].list[
        action.payload.subindex
      ].isChanged = true;
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
            detail: detailList,
            userId: 1,
          });
        } else {
          if (todo.isChanged === true) {
            todo.isChanged = false;
            updateTodolist.push({
              id: todo.id,
              todo: todo.title,
              todoindex: null,
              isFinish: false,
            });
          }
          todo.list.map((data, idx) => {
            if (data.id === -1) {
              createTodolistDetail.push({
                detail: data.content,
                todoId: todo.id,
              });
            } else if (data.isChanged === true) {
              data.isChanged = false;
              updateTodolistDetail.push({
                detail: data.content,
                id: data.id,
                isFinish: data.complete,
              });
            }
          });
        }
      });
      if (createTodolist.length !== 0) {
        axios
          .post(serverUrl + '/todoList/create', createTodolist)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (createTodolistDetail.length !== 0) {
        axios
          .post(serverUrl + '/todoList/createDetail', createTodolistDetail)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (updateTodolist.length !== 0) {
        axios
          .patch(serverUrl + '/todoList/update', updateTodolist)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (updateTodolistDetail.length !== 0) {
        axios
          .patch(serverUrl + '/todoList/updateDetail', updateTodolistDetail)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      todaydate = state.requestdate;
      todolistData = [];
      todolistToday = [];
      getTodolistData();
      state.allTodolist = todolistData;
      state.todolist = todolistToday;
      return {
        ...state,
        todolist: state.todolist,
      };
    case SETDATE:
      state.requestdate = action.payload;
      todolistToday = [];
      todolistTotal = 0;
      todolistComplete = 0;
      state.allTodolist.map((x, index) => {
        if (x.date === state.requestdate) {
          todolistToday.push(state.allTodolist[index]);
          todolistTotal += x.list.length;
          x.list.map((y, idx) => {
            if (y.complete === true) {
              todolistComplete++;
            }
          });
        }
      });
      state.todolist = todolistToday;
      state.todocomplete = todolistComplete;
      state.todototal = todolistTotal;
      state.todopercent = (todolistComplete / todolistTotal) * 100;
      if (todolistTotal === 0) {
        state.todopercent = 0;
      }
      return {
        ...state,
        // todolist: [...state.todolist],
      };
    default:
      return state;
  }
};

export default setTodolist;
