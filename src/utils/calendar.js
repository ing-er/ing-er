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
    const parentEle = ab.parentElement;
    
    // 초기화
    parentEle.style.backgroundColor = 'transparent';
    
    // 색칠
    const idx = dateList.indexOf(myAriaLabel);
    if (idx !== -1) {
      const color = getColor(studyTimes[idx]);
      parentEle.style.backgroundColor = color;
    }
  }
};

const getColor = (time) => {
  let colorCode = '';

  if (0 < time && time < 10800) {
    colorCode = '#fff5ed';
  } else if (10800 <= time && time < 21600) {
    colorCode = '#ffe0ca';
  } else if (21600 <= time && time < 36000) {
    colorCode = '#ffab72';
  } else if (time >= 36000) {
    colorCode = '#E96F02';
  }
  return colorCode;
};
