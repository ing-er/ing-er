import { changeKRFormat } from './date';

export const setCalendarBackground = (calendar) => {
  const dateList = ['2021년 8월 13일', '2021년 8월 14일', '2021년 8월 15일', '2021년 8월 16일'];
  const _studyTime = [2, 5, 8, 10]
  for (let cal of calendar) {
    const KRdate = changeKRFormat(cal.date);
    dateList.push(KRdate);
  }

  const abbr = document.querySelectorAll('abbr');
  for (let ab of abbr) {
    const myAriaLabel = ab.getAttribute('aria-label');
    const idx = dateList.indexOf(myAriaLabel);
    if (idx !== -1) {
      const parentEle = ab.parentElement;
      const color = getColor(_studyTime[idx]);
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
