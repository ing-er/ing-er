import axios from 'axios';
import Swal from 'sweetalert2';

export const ADDCONTAINER = 'ADDCONTAINER';
export const ADDINPUT = 'ADDINPUT';
export const EDITTITLE = 'EDITTITLE';
export const EDITCONTENT = 'EDITCONTENT';
export const EDITCOMPLETE = 'EDITCOMPLETE';
export const SAVETODOLIST = 'SAVETODOLIST';
export const SETDATE = 'TODOLIST/SETDATE';
export const DELETETODOLIST = 'DELETETODOLIST';
export const DELETEDETAIL = 'DELETEDETAIL';

const serverUrl = process.env.REACT_APP_SERVER_URL;

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

export const setTodolistDeleteTodolist = (index) => ({
  type: DELETETODOLIST,
  payload: {
    index: index,
  },
});

export const setTodolistDeleteDetail = (index, subindex) => ({
  type: DELETEDETAIL,
  payload: {
    index: index,
    subindex: subindex,
  },
});

var todolistData = [];
var todolistToday = [];
let todolistComplete = 0;
let todolistTotal = 0;
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let todaydate = year + '-' + month + '-' + day;
let userId;

export const getTodolistData = async (id) => {
  userId = id;
  todolistData = [];
  todolistToday = [];
  todolistTotal = 0;
  todolistComplete = 0;
  await axios
    .get(serverUrl + 'todoList/select/' + id)
    .then((res) => {
      // console.log(res);
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
      // console.log('load 완료..');
    })
    .catch((err) => {
      // console.log(err);
    });
};

// getTodolistData();

const initialState = {
  allTodolist: todolistData,
  todolist: todolistToday,
  todototal: todolistTotal,
  todocomplete: todolistComplete,
  todopercent:
    todolistTotal === 0
      ? 0
      : Math.round((todolistComplete / todolistTotal) * 100),
  requestdate: todaydate,
};

let deleteTodolistDetail = [];
let deleteTodolist = [];

const setTodolist = (state = initialState, action) => {
  switch (action.type) {
    case ADDCONTAINER:
      let len = todolistData.length;
      todolistData.push({
        id: -1,
        todoidx: len,
        title: action.payload,
        isChanged: true,
        date: state.requestdate,
        list: [],
      });
      todolistToday.push(todolistData[len]);
      return {
        ...state,
        todolist: todolistToday,
        allTodolist: todolistData,
      };
    case ADDINPUT:
      let idx = todolistToday[action.payload].todoidx;
      let listlen = todolistToday[action.payload].list.length;
      let todolistIdx = todolistData.map((x) => x.todoidx).indexOf(idx);
      // console.log('todolistIdx : ' + todolistIdx);
      todolistData[todolistIdx].list.push({
        id: -1,
        todoidx: idx,
        detailidx: listlen,
        content: '',
        complete: false,
        isChanged: true,
      });
      state.todototal++;
      todolistTotal++;
      state.todopercent = (state.todocomplete / state.todototal) * 100;
      return {
        ...state,
        todolist: todolistToday,
        todopercent:
          todolistTotal === 0
            ? 0
            : Math.round((todolistComplete / todolistTotal) * 100),
        allTodolist: todolistData,
      };
    case EDITTITLE:
      todolistToday[action.payload.index].title = action.payload.title;
      todolistToday[action.payload.index].isChanged = true;
      return {
        ...state,
        todolist: todolistToday,
        // todolist: state.todolist,
      };
    case EDITCONTENT:
      todolistToday[action.payload.index].list[
        action.payload.subindex
      ].content = action.payload.content;
      todolistToday[action.payload.index].list[
        action.payload.subindex
      ].isChanged = true;
      return {
        ...state,
        todolist: todolistToday,
      };
    case EDITCOMPLETE:
      todolistToday[action.payload.index].list[
        action.payload.subindex
      ].complete =
        !todolistToday[action.payload.index].list[action.payload.subindex]
          .complete;
      todolistToday[action.payload.index].list[
        action.payload.subindex
      ].isChanged = true;
      if (
        todolistToday[action.payload.index].list[action.payload.subindex]
          .complete === true
      ) {
        state.todocomplete++;
        todolistComplete++;
      } else {
        state.todocomplete--;
        todolistComplete--;
      }
      state.todopercent = (state.todocomplete / state.todototal) * 100;
      return {
        ...state,
        todolist: todolistToday,
        todopercent:
          todolistTotal === 0
            ? 0
            : Math.round((todolistComplete / todolistTotal) * 100),
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
            userId: userId,
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

      const async = async () => {
        let check = false;
        let checkError = false;
        if (createTodolist.length !== 0) {
          await axios
            .post(serverUrl + 'todoList/create', createTodolist)
            .then((res) => {
              // console.log(res);
              check = true;
            })
            .catch((err) => {
              // console.log(err);
              checkError = true;
            });
        }
        if (createTodolistDetail.length !== 0) {
          await axios
            .post(serverUrl + 'todoList/createDetail', createTodolistDetail)
            .then((res) => {
              // console.log(res);
              check = true;
            })
            .catch((err) => {
              // console.log(err);
              checkError = true;
            });
        }
        if (updateTodolist.length !== 0) {
          await axios
            .patch(serverUrl + '/todoList/update', updateTodolist)
            .then((res) => {
              // console.log(res);
              check = true;
            })
            .catch((err) => {
              // console.log(err);
              checkError = true;
            });
        }
        if (updateTodolistDetail.length !== 0) {
          await axios
            .patch(serverUrl + 'todoList/updateDetail', updateTodolistDetail)
            .then((res) => {
              // console.log(res);
              check = true;
            })
            .catch((err) => {
              // console.log(err);
              checkError = true;
            });
        }
        if (deleteTodolistDetail.length !== 0) {
          await axios
            .delete(serverUrl + 'todoList/deleteDetail', {
              data: deleteTodolistDetail,
            })
            .then((res) => {
              // console.log(res);
              deleteTodolistDetail = [];
              check = true;
            })
            .catch((err) => {
              // console.log(err);
              checkError = true;
            });
        }
        if (deleteTodolist.length !== 0) {
          await axios
            .delete(serverUrl + 'todoList/delete', { data: deleteTodolist })
            .then((res) => {
              // console.log(res);
              deleteTodolist = [];
              check = true;
            })
            .catch((err) => {
              // console.log(err);
              checkError = true;
            });
        }

        await axios
          .get(serverUrl + 'todoList/select/' + userId)
          .then((res) => {
            // console.log(res);
            todaydate = state.requestdate;
            todolistData = [];
            todolistToday = [];
            todolistComplete = 0;
            todolistTotal = 0;
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
            state.allTodolist = todolistData;
            state.todolist = todolistToday;
          })
          .catch((err) => {
            // console.log(err);
          });

        if (check && !checkError) {
          await Swal.fire({
            title:
              '<span style="color: white; font-size: 20px">' +
              state.requestdate +
              '\nTodolist가 저장되었습니다</span>',
            icon: 'success',
            background: '#292A33',
            confirmButtonColor: '#E96F02',
            confirmButtonText: 'OK!',
          });
        } else if (!check && !checkError) {
          await Swal.fire({
            title:
              '<span style="color: white; font-size: 20px">' +
              state.requestdate +
              '\nTodolist 저장할 내용이 없습니다</span>',
            icon: 'warning',
            background: '#292A33',
            confirmButtonColor: '#E96F02',
            confirmButtonText: 'OK!',
          });
        } else if (checkError) {
          await Swal.fire({
            title:
              '<span style="color: white; font-size: 20px">' +
              state.requestdate +
              '\nTodolist 저장하는 중 오류 발생</span>',
            icon: 'error',
            background: '#292A33',
            confirmButtonColor: '#E96F02',
            confirmButtonText: 'OK!',
          });
        }
      };

      async();
      // todaydate = state.requestdate;
      // todolistData = [];
      // todolistToday = [];
      // getTodolistData();

      // state.allTodolist = todolistData;
      // state.todolist = todolistToday;

      return {
        ...state,
        todolist: todolistToday,
        allTodolist: todolistData,
        todocomplete: todolistComplete,
        todototal: todolistTotal,
        todopercent:
          todolistTotal === 0
            ? 0
            : Math.round((todolistComplete / todolistTotal) * 100),
      };
    case SETDATE:
      state.requestdate = action.payload;
      todolistToday = [];
      todolistTotal = 0;
      todolistComplete = 0;
      todolistData.map((x, index) => {
        if (x.date === state.requestdate) {
          todolistToday.push(todolistData[index]);
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
        todolist: todolistToday,
        todopercent:
          todolistTotal === 0
            ? 0
            : Math.round((todolistComplete / todolistTotal) * 100),
      };
    case DELETETODOLIST:
      let tododata = todolistToday[action.payload.index];
      if (tododata.id !== -1) {
        deleteTodolist.push(tododata.id);
      }
      todolistToday.splice(action.payload.index, 1);
      todolistData.splice(tododata.todoidx, 1);
      tododata.list.map((x, idx) => {
        todolistTotal--;
        if (x.complete === true) {
          todolistComplete--;
        }
      });
      todolistData.map((x, idx) => {
        if (idx >= tododata.todoidx) {
          x.todoidx--;
          x.list.map((y, subidx) => {
            y.todoidx--;
          });
        }
      });
      return {
        ...state,
        todolist: todolistToday,
        allTodolist: todolistData,
        todopercent:
          todolistTotal === 0
            ? 0
            : Math.round((todolistComplete / todolistTotal) * 100),
      };
    case DELETEDETAIL:
      let data =
        todolistToday[action.payload.index].list[action.payload.subindex];
      if (data.id !== -1) {
        deleteTodolistDetail.push(data.id);
      }
      todolistToday[action.payload.index].list.splice(
        action.payload.subindex,
        1,
      );
      todolistToday[action.payload.index].list.map((x, idx) => {
        if (idx >= action.payload.subindex) {
          x.detailidx--;
        }
      });
      todolistTotal--;
      if (data.complete) todolistComplete--;
      return {
        ...state,
        todolist: todolistToday,
        todopercent:
          todolistTotal === 0
            ? 0
            : Math.round((todolistComplete / todolistTotal) * 100),
      };
    default:
      return state;
  }
};

export default setTodolist;
