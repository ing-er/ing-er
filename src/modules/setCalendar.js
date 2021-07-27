export const EDITPROMISE = 'EDITPROMISE';
export const EDITDIARY = 'EDITDIARY';
export const EDITPROMISEISEDITABLE = 'EDITPROMISEISEDITABLE';
export const EDITDIARYISEDITABLE = 'EDITDIARYISEDITABLE';
export const SETDATE = 'SETDATE';

export const setCalendarEditPromise = (promise, calendar) => ({
  type: EDITPROMISE,
  payload: promise,
  calendar,
});

export const setCalendarEditDiary = (diary, calendar) => ({
  type: EDITDIARY,
  payload: diary,
  calendar,
});

export const setCalendarEditPromiseIsEditable = (calendar) => ({
  type: EDITPROMISEISEDITABLE,
  calendar,
});

export const setCalendarEditDiaryIsEditable = (calendar) => ({
  type: EDITDIARYISEDITABLE,
  calendar,
});

export const setCalendarSetDate = (date, calendar) => ({
  type: SETDATE,
  payload: date,
  calendar,
});

const initialState = {
  calendar: {
    date: new Date().toLocaleDateString(),
    promise: { content: '오늘 다짐', isEditable: false },
    diary: { content: '오늘 일기', isEditable: false },
  },
};

const setCalendar = (state = initialState, action) => {
  switch (action.type) {
    case EDITPROMISE:
      state.calendar.promise.content = action.payload;
      return {
        ...state,
        calendar: state.calendar,
      };
    case EDITDIARY:
      state.calendar.diary.content = action.payload;
      return {
        ...state,
        calendar: state.calendar,
      };
    case EDITPROMISEISEDITABLE:
      state.calendar.promise.isEditable = !state.calendar.promise.isEditable;
      return {
        ...state,
        calendar: state.calendar,
      };
    case EDITDIARYISEDITABLE:
      state.calendar.diary.isEditable = !state.calendar.diary.isEditable;
      return {
        ...state,
        calendar: state.calendar,
      };
    case SETDATE:
      state.calendar.date = action.payload;
      return {
        ...state,
        calendar: state.calendar,
        date: state.calendar.date,
      };
    default:
      return state;
  }
};

export default setCalendar;
