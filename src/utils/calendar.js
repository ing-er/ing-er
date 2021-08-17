import { changeENFormat, changeKRFormat } from './date';

export const setCalendarBackground = (calendar) => {
  const dateList = [];
  const dateListEn = [];
  const studyTimes = []
  for (let cal of calendar) {
    const KRdate = changeKRFormat(cal.date);
    const Endate = changeENFormat(cal.date);
    const _sTime = cal.studyTime;

    dateList.push(KRdate);
    dateListEn.push(Endate)
    studyTimes.push(_sTime);
  }

  const abbr = document.querySelectorAll('abbr');
  const flagAriaLabel = abbr[0].getAttribute('aria-label');
  for (let i = 0; i < abbr.length; i++) {
    if (flagAriaLabel === '일요일') {
      const myAriaLabel = abbr[i].getAttribute('aria-label');
      const parentEle = abbr[i].parentElement;
      
      // 초기화
      parentEle.style.backgroundColor = 'transparent';
      
      // 색칠
      const idx = dateList.indexOf(myAriaLabel);
      if (idx !== -1) {
        const color = getColor(studyTimes[idx]);
        parentEle.style.backgroundColor = color;
      }
    } else if (flagAriaLabel === 'Sunday') {
      const myAriaLabel = abbr[i].getAttribute('aria-label');
      const parentEle = abbr[i].parentElement;
      
      // 초기화
      parentEle.style.backgroundColor = 'transparent';
      
      // 색칠
      const idx = dateListEn.indexOf(myAriaLabel);
      if (idx !== -1) {
        const color = getColor(studyTimes[idx]);
        parentEle.style.backgroundColor = color;
      }
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
