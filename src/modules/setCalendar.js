import axios from 'axios';

export const EDITPROMISE = 'EDITPROMISE';
export const EDITDIARY = 'EDITDIARY';
export const EDITPROMISEISEDITABLE = 'EDITPROMISEISEDITABLE';
export const EDITDIARYISEDITABLE = 'EDITDIARYISEDITABLE';
export const SETDATE = 'SETDATE';

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

export const setCalendarEditPromiseIsEditable = (requestcalendar) => ({
  type: EDITPROMISEISEDITABLE,
  requestcalendar,
});

export const setCalendarEditDiaryIsEditable = (requestcalendar) => ({
  type: EDITDIARYISEDITABLE,
  requestcalendar,
});

export const setCalendarSetDate = (date, requestcalendar) => ({
  type: SETDATE,
  payload: date,
  requestcalendar,
});

function getCalendarData() {}

const initialState = {
  calendar: [
    {
      date: '2021. 7. 27.',
      promise: { content: '오늘 다짐!', isEditable: false },
      diary: { content: '오늘 일기!', isEditable: false },
    },
    {
      date: '2021. 7. 28.',
      promise: { content: '오늘 다짐', isEditable: false },
      diary: { content: '오늘 일기', isEditable: false },
    },
  ],
  requestdate: new Date().toLocaleDateString(),
  requestcalendar: {},
};

const setCalendar = (state = initialState, action) => {
  var idx = state.calendar.map((x) => x.date).indexOf(state.requestdate);
  state.requestcalendar = state.calendar[idx];
  switch (action.type) {
    case EDITPROMISE:
      state.calendar[idx].promise.content = action.payload;
      state.requestcalendar = state.calendar[idx];
      return {
        ...state,
        requestcalendar: state.requestcalendar,
      };
    case EDITDIARY:
      state.calendar[idx].diary.content = action.payload;
      state.requestcalendar = state.calendar[idx];
      return {
        ...state,
        requestcalendar: state.requestcalendar,
      };
    case EDITPROMISEISEDITABLE:
      state.requestcalendar.promise.isEditable =
        !state.requestcalendar.promise.isEditable;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
      };
    case EDITDIARYISEDITABLE:
      state.requestcalendar.diary.isEditable =
        !state.requestcalendar.diary.isEditable;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
      };
    case SETDATE:
      state.requestdate = action.payload;
      idx = state.calendar.map((x) => x.date).indexOf(state.requestdate);
      state.requestcalendar = state.calendar[idx];
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
