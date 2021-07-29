import axios from 'axios';

export const EDITPROMISE = 'EDITPROMISE';
export const EDITDIARY = 'EDITDIARY';
export const EDITPROMISEISEDITABLE = 'EDITPROMISEISEDITABLE';
export const EDITDIARYISEDITABLE = 'EDITDIARYISEDITABLE';
export const SETDATE = 'SETDATE';
export const SAVEDATA = 'SAVEDATA';

const HOST = 'localhost:8080';
const serverUrl = `http://${HOST}/api/v1`;

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

let list = [];
function getCalendarData() {
  axios.get(serverUrl + '/calendar/list/' + 1).then((res) => {
    res.data.map((x, index) => {
      list.push({
        date: x.date,
        promise: x.promise,
        diary: x.diary,
        id: x.id,
      });
    });
  });
}
getCalendarData();
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

const initialState = {
  calendar: list,
  isEditablePromise: false,
  isEditableDiary: false,
  requestdate: year + '-' + month + '-' + day,
  requestcalendar: {
    date: '',
    promise: '',
    diary: '',
    id: -1,
  },
};

const setCalendar = (state = initialState, action) => {
  console.log(state.calendar);
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
        userId: 1,
      };
      if (id !== -1) {
        axios
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
        axios
          .post(serverUrl + '/calendar/regist', post)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default setCalendar;
