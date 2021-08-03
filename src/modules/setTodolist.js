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

function getTodolistData() {
  axios
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
            content: y.detail,
            complete: y.isFinish,
            isChanged: false,
          });
        });
        todolistData.push({
          id: x.id,
          date: x.date,
          title: x.todo,
          isChanged: false,
          list: todolistDetail,
        });
        if (x.date === todaydate) {
          todolistToday.push({
            id: x.id,
            date: x.date,
            title: x.todo,
            isChanged: false,
            list: todolistDetail,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

getTodolistData();
console.log('complete: ' + todolistComplete);
console.log('total: ' + todolistTotal);

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
  switch (action.type) {
    case ADDCONTAINER:
      state.todolist.push({
        id: -1,
        title: action.payload,
        isChanged: false,
        date: state.requestdate,
        list: [],
      });
      return {
        ...state,
        todolist: state.todolist,
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
      let todolistData = [];
      axios
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
                content: y.detail,
                complete: y.isFinish,
                isChanged: false,
              });
            });
            todolistData.push({
              id: x.id,
              date: x.date,
              title: x.todo,
              isChanged: false,
              list: todolistDetail,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      state.allTodolist = todolistData;
      return {
        ...state,
      };
    case SETDATE:
      state.requestdate = action.payload;
      let todolistdate = [];
      let todoTotal = 0;
      let todoCompl = 0;
      state.allTodolist.map((x, index) => {
        if (x.date === state.requestdate) {
          todolistdate.push({
            id: x.id,
            date: x.date,
            title: x.title,
            isChanged: false,
            list: x.list,
          });
          todoTotal += x.list.length;
          x.list.map((y, idx) => {
            if (y.complete === true) {
              todoCompl++;
            }
          });
        }
      });
      state.todolist = todolistdate;
      state.todocomplete = todoCompl;
      state.todototal = todoTotal;
      state.todopercent = (todoCompl / todoTotal) * 100;
      if (todoTotal === 0) {
        state.todopercent = 0;
      }
      return {
        ...state,
        todolist: [...state.todolist],
      };
    default:
      return state;
  }
};

export default setTodolist;
