import { changeKRFormat } from './date';

export const setCalendarBackground = (calendar) => {
  const dateList = [];
  const studyTimes = []
  for (let cal of calendar) {
    const KRdate = changeKRFormat(cal.date);
    const _sTime = cal.studyTime;
    dateList.push(KRdate);
    studyTimes.push(_sTime)
  }

  const abbr = document.querySelectorAll('abbr');
  for (let ab of abbr) {
    const myAriaLabel = ab.getAttribute('aria-label');
    const idx = dateList.indexOf(myAriaLabel);
    if (idx !== -1) {
      const parentEle = ab.parentElement;
      const color = getColor(studyTimes[idx]);
      parentEle.style.backgroundColor = color;
    }
  }
};

const getColor = (time) => {
  let colorCode = '';

  if (0 < time && time < 3) {
    colorCode = '#fff5ed';
  } else if (time < 6) {
    colorCode = '#ffe0ca';
  } else if (time < 10) {
    colorCode = '#ffab72';
  } else if (time >= 10) {
    colorCode = '#E96F02';
  }

  return colorCode;
};
