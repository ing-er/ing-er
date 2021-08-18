import axios from 'axios';
import Swal from 'sweetalert2';

export const EDITPROMISE = 'EDITPROMISE';
export const EDITDIARY = 'EDITDIARY';
export const EDITPROMISEISEDITABLE = 'EDITPROMISEISEDITABLE';
export const EDITDIARYISEDITABLE = 'EDITDIARYISEDITABLE';
export const SETDATE = 'CALENDAR/SETDATE';
export const SAVEDATA = 'SAVEDATA';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const setCalendarEditPromise = (promise) => ({
  type: EDITPROMISE,
  payload: promise,
});

export const setCalendarEditDiary = (diary) => ({
  type: EDITDIARY,
  payload: diary,
});

export const setCalendarEditPromiseIsEditable = (
  isEditablePromise,
  isEditableDiary,
) => ({
  type: EDITPROMISEISEDITABLE,
  isEditablePromise,
  isEditableDiary,
});

export const setCalendarEditDiaryIsEditable = (
  isEditablePromise,
  isEditableDiary,
) => ({
  type: EDITDIARYISEDITABLE,
  isEditablePromise,
  isEditableDiary,
});

export const setCalendarSetDate = (date) => ({
  type: SETDATE,
  payload: date,
});

export const setCalendarSaveData = () => ({
  type: SAVEDATA,
});

let userId;
let list = [];
let listToday = {};
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let todaydate = year + '-' + month + '-' + day;

export const getCalendarData = async (id) => {
  userId = id;
  list = [];
  listToday = {};
  await axios.get(serverUrl + 'calendar/list/' + id).then((res) => {
    res.data.map((x, index) => {
      list.push({
        date: x.date,
        promise: x.promise === null ? '' : x.promise,
        diary: x.diary === null ? '' : x.diary,
        id: x.id,
        studyTime: x.studyTime,
      });
      if (x.date === todaydate) {
        listToday = {
          date: x.date,
          promise: x.promise === null ? '' : x.promise,
          diary: x.diary === null ? '' : x.diary,
          id: x.id,
          studyTime: x.studyTime,
        };
      }
    });
  });
};
// getCalendarData();

const initialState = {
  calendar: list,
  isEditablePromise: false,
  isEditableDiary: false,
  requestdate: todaydate,
  requestcalendar: listToday,
};

const setCalendar = (state = initialState, action) => {
  // console.log(state.calendar);
  var idx = list.map((x) => x.date).indexOf(listToday);
  // if (idx !== -1) {
  //   state.requestcalendar = state.calendar[idx];
  // }
  switch (action.type) {
    case EDITPROMISE:
      listToday.promise = action.payload;
      if (idx === -1) {
        list.push(listToday);
        idx = list.length - 1;
      }
      list[idx].promise = listToday.promise;
      return {
        ...state,
        calendar: list,
        requestcalendar: listToday,
      };
    case EDITDIARY:
      listToday.diary = action.payload;
      if (idx === -1) {
        list.push(listToday);
        idx = list.length - 1;
      }
      list[idx].diary = listToday.diary;
      return {
        ...state,
        calendar: list,
        requestcalendar: listToday,
      };
    case EDITPROMISEISEDITABLE:
      state.isEditablePromise = !state.isEditablePromise;
      return {
        ...state,
        requestcalendar: listToday,
        isEditablePromise: state.isEditablePromise,
        isEditableDiary: state.isEditableDiary,
      };
    case EDITDIARYISEDITABLE:
      state.isEditableDiary = !state.isEditableDiary;
      return {
        ...state,
        requestcalendar: listToday,
        isEditablePromise: state.isEditablePromise,
        isEditableDiary: state.isEditableDiary,
      };
    case SETDATE:
      state.requestdate = action.payload;
      idx = list.map((x) => x.date).indexOf(state.requestdate);
      if (idx !== -1) {
        listToday = list[idx];
      } else {
        listToday = {
          date: state.requestdate,
          promise: '',
          diary: '',
          id: -1,
          studyTime: 0,
        };
      }
      return {
        ...state,
        calendar: list,
        requestcalendar: listToday,
        requestdate: state.requestdate,
      };
    case SAVEDATA:
      let id = listToday.id;
      let post = {
        date: listToday.date,
        diary: listToday.diary,
        promise: listToday.promise,
        userId: userId,
      };
      let check = false;
      let checkError = false;
      const async = async () => {
        if (id !== -1) {
          await axios
            .patch(serverUrl + 'calendar/modify/' + id, post)
            .then((res) => {
              console.log(res);
              check = true;
            })
            .catch((err) => {
              // console.log(err);
              checkError = true;
            });
        } else {
          // if (listToday.promise === '' && listToday.diary === '') {
          //   return {
          //     ...state,
          //     requestcalendar: listToday,
          //     calendar: list,
          //   };
          // }
          if (listToday.promise !== '' || listToday.diary !== '') {
            await axios
              .post(serverUrl + 'calendar/regist', post)
              .then((res) => {
                // console.log(res);
                check = true;
              })
              .catch((err) => {
                // console.log(err);
                checkError = true;
              });
          }
        }
        if (check && !checkError) {
          await Swal.fire({
            title:
              '<span style="color: white; font-size: 20px">' +
              listToday.date +
              '\n다짐, 일기가 저장되었습니다</span>',
            icon: 'success',
            background: '#292A33',
            confirmButtonColor: '#E96F02',
            confirmButtonText: 'OK!',
          });
        } else if (!check && !checkError) {
          await Swal.fire({
            title:
              '<span style="color: white; font-size: 20px">' +
              listToday.date +
              '\n다짐, 일기 저장할 내용이 없습니다</span>',
            icon: 'warning',
            background: '#292A33',
            confirmButtonColor: '#E96F02',
            confirmButtonText: 'OK!',
          });
        } else if (checkError) {
          await Swal.fire({
            title:
              '<span style="color: white; font-size: 20px">' +
              listToday.date +
              '\n다짐, 일기를 저장하는 중 오류 발생</span>',
            icon: 'error',
            background: '#292A33',
            confirmButtonColor: '#E96F02',
            confirmButtonText: 'OK!',
          });
        }
      };
      async();
      return {
        ...state,
        requestcalendar: listToday,
        calendar: list,
      };
    default:
      return state;
  }
};

export default setCalendar;
