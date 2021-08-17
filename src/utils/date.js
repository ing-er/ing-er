export const getToday = () => {
  const date = new Date();
  const today = `${date.getFullYear()}-${leftpad(date.getMonth() + 1)}-${leftpad(date.getDate())}`;
  return today;
};

export const getYesterday = () => {
  const date = new Date();
  const yesterdayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  const yesterday = `${yesterdayDate.getFullYear()}-${leftpad(yesterdayDate.getMonth() + 1)}-${leftpad(yesterdayDate.getDate())}`;

  return yesterday;
};

export const getTodaySeconds = () => {
  let totalSeconds = 0
 
  const date = new Date(); 
  const hour = date.getHours() * 3600;
  const minutes = date.getMinutes() * 60;
  const seconds = date.getSeconds();
  
  totalSeconds = hour + minutes + seconds;
  
  return totalSeconds
}

export const changeZeroDateFormat = (date) => {
  let dateForamt = '';
  
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  let day = date.getDate();
  day = day < 10 ? '0' + day : day;
  
  dateForamt = `${year}-${month}-${day}`;
  return dateForamt;
};

export const changeKRFormat = (date) => {
  let [year, month, day] = date.split('-');
  
  if (month.charAt(0) === '0') {
    month = month.slice(1);
  }
  if (day.charAt(0) === '0') {
    day = day.slice(1);
  }
  
  return `${year}년 ${month}월 ${day}일`
}

export const changeENFormat = (date) => {
  const monthObj = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'Novenber',
    12: 'December'
  }
  let [year, month, day] = date.split('-');
  
  if (month.charAt(0) === '0') {
    month = month.slice(1);
  }
  month = monthObj[month];

  if (day.charAt(0) === '0') {
    day = day.slice(1);
  }
  
  
  return `${month} ${day}, ${year}`;
}


const leftpad = (value) => {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
};