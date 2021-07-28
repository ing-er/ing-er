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
      };
    case EDITDIARY:
      state.requestcalendar.diary = action.payload;
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
        state.calendar.push(state.requestcalendar);
        idx = state.calendar.length - 1;
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
