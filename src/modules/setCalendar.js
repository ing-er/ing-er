import axios from 'axios';

export const EDITPROMISE = 'EDITPROMISE';
export const EDITDIARY = 'EDITDIARY';
export const EDITPROMISEISEDITABLE = 'EDITPROMISEISEDITABLE';
export const EDITDIARYISEDITABLE = 'EDITDIARYISEDITABLE';
export const SETDATE = 'SETDATE';

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

function getCalendarData() {
  return new Promise((resolve, reject) => {
    axios.get(serverUrl + '/calendar/list/' + 1).then((res) => {
      resolve(res.data);
    });
  });
}
let list = [];
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
getCalendarData().then((res) => {
  res.map((data, index) => {
    list.push({
      date: data.date,
      promise: data.promise,
      diary: data.diary,
    });
  });
});

const initialState = {
  calendar: list,
  isEditablePromise: false,
  isEditableDiary: false,
  requestdate: year + '-' + month + '-' + day,
  requestcalendar: {
    date: '',
    promise: '',
    diary: '',
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
        };
      }
      return {
        ...state,
        requestcalendar: state.requestcalendar,
        requestdate: state.requestdate,
      };
    default:
      return state;
  }
};

export default setCalendar;
