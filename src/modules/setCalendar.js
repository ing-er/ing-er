import axios from 'axios';

export const EDITPROMISE = 'EDITPROMISE';
export const EDITDIARY = 'EDITDIARY';
export const EDITPROMISEISEDITABLE = 'EDITPROMISEISEDITABLE';
export const EDITDIARYISEDITABLE = 'EDITDIARYISEDITABLE';
export const SETDATE = 'SETDATE';

export const setCalendarEditPromise = (
  promise,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
) => ({
  type: EDITPROMISE,
  payload: promise,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
});

export const setCalendarEditDiary = (
  diary,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
) => ({
  type: EDITDIARY,
  payload: diary,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
});

export const setCalendarEditPromiseIsEditable = (
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
) => ({
  type: EDITPROMISEISEDITABLE,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
});

export const setCalendarEditDiaryIsEditable = (
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
) => ({
  type: EDITDIARYISEDITABLE,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
});

export const setCalendarSetDate = (
  date,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
) => ({
  type: SETDATE,
  payload: date,
  requestcalendar,
  isEditablePromise,
  isEditableDiary,
});

function getCalendarData() {}

const initialState = {
  calendar: [
    {
      date: '2021. 7. 27.',
      promise: '오늘 다짐!',
      diary: '오늘 일기!',
    },
    {
      date: '2021. 7. 28.',
      promise: '오늘 다짐',
      diary: '오늘 일기',
    },
  ],
  isEditablePromise: false,
  isEditableDiary: false,
  requestdate: new Date().toLocaleDateString(),
  requestcalendar: {
    date: '',
    promise: '',
    diary: '',
  },
};

const setCalendar = (state = initialState, action) => {
  var idx = state.calendar.map((x) => x.date).indexOf(state.requestdate);
  state.requestcalendar = state.calendar[idx];
  switch (action.type) {
    case EDITPROMISE:
      state.requestcalendar.promise = action.payload;
      state.calendar[idx].promise = state.requestcalendar.promise;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
        isEditablePromise: state.isEditablePromise,
        isEditableDiary: state.isEditableDiary,
      };
    case EDITDIARY:
      state.requestcalendar.diary = action.payload;
      state.calendar[idx].diary = state.requestcalendar.diary;
      return {
        ...state,
        requestcalendar: state.requestcalendar,
        isEditablePromise: state.isEditablePromise,
        isEditableDiary: state.isEditableDiary,
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
        state.calendar.push(state.requestcalendar);
        idx = state.calendar.length - 1;
      }
      return {
        ...state,
        requestcalendar: state.requestcalendar,
        requestdate: state.requestdate,
        isEditablePromise: state.isEditablePromise,
        isEditableDiary: state.isEditableDiary,
      };
    default:
      return state;
  }
};

export default setCalendar;
