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


const leftpad = (value) => {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
};