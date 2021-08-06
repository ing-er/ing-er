import axios from 'axios';

export const EDITPROMISE = 'EDITPROMISE';
export const EDITDIARY = 'EDITDIARY';
export const EDITPROMISEISEDITABLE = 'EDITPROMISEISEDITABLE';
export const EDITDIARYISEDITABLE = 'EDITDIARYISEDITABLE';
export const SETDATE = 'CALENDAR/SETDATE';
export const SAVEDATA = 'SAVEDATA';

const HOST = 'localhost:8080';
const serverUrl = `http://${HOST}/api/v1`;
// const HOST = 'i5a208.p.ssafy.io:8080';
// const serverUrl = `http://${HOST}/api/v1`;

export const setCalendarEditPromise = (promise, requestcalendar) => ({
  type: EDITPROMISE,
  payload: promise,
  requestcalendar,
});

export const setCalendarEditDiary = (diary, requestcalendar) => ({
  type: EDITDIARY,
  payload: diary,
  requestcalendar,
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

export const setCalendarSetDate = (date, requestcalendar) => ({
  type: SETDATE,
  payload: date,
  requestcalendar,
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
  await axios.get(serverUrl + '/calendar/list/' + id).then((res) => {
    res.data.map((x, index) => {
      list.push({
        date: x.date,
        promise: x.promise,
        diary: x.diary,
        id: x.id,
      });
      if (x.date === todaydate) {
        listToday = {
          date: x.date,
          promise: x.promise,
          diary: x.diary,
          id: x.id,
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
  var idx = state.calendar.map((x) => x.date).indexOf(state.requestdate);
  // if (idx !== -1) {
  //   state.requestcalendar = state.calendar[idx];
  // }
  switch (action.type) {
    case EDITPROMISE:
      state.requestcalendar.promise = action.payload;
      if (idx === -1) {
        state.calendar.push(state.requestcalendar);
        idx = state.calendar.length - 1;
      }
      state.calendar[idx].promise = state.requestcalendar.promise;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
      };
    case EDITDIARY:
      state.requestcalendar.diary = action.payload;
      if (idx === -1) {
        state.calendar.push(state.requestcalendar);
        idx = state.calendar.length - 1;
      }
      state.calendar[idx].diary = state.requestcalendar.diary;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
      };
    case EDITPROMISEISEDITABLE:
      state.isEditablePromise = !state.isEditablePromise;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
        isEditablePromise: state.isEditablePromise,
        isEditableDiary: state.isEditableDiary,
      };
    case EDITDIARYISEDITABLE:
      state.isEditableDiary = !state.isEditableDiary;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
        isEditablePromise: state.isEditablePromise,
        isEditableDiary: state.isEditableDiary,
      };
    case SETDATE:
      state.requestdate = action.payload;
      idx = state.calendar.map((x) => x.date).indexOf(state.requestdate);
      if (idx !== -1) {
        state.requestcalendar = state.calendar[idx];
      } else {
        state.requestcalendar = {
          date: state.requestdate,
          promise: '',
          diary: '',
          id: -1,
        };
      }
      return {
        ...state,
        requestcalendar: state.requestcalendar,
        requestdate: state.requestdate,
      };
    case SAVEDATA:
      let id = state.requestcalendar.id;
      let post = {
        date: state.requestcalendar.date,
        diary: state.requestcalendar.diary,
        promise: state.requestcalendar.promise,
        userId: userId,
      };
      const async = async () => {
        if (id !== -1) {
          await axios
            .patch(serverUrl + '/calendar/modify/' + id, post)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          if (
            state.requestcalendar.promise === '' &&
            state.requestcalendar.diary === ''
          ) {
            return {
              ...state,
            };
          }
          await axios
            .post(serverUrl + '/calendar/regist', post)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      async();
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default setCalendar;
