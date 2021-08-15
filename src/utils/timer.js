export const secToTimeFormat = (sec) => {
  let hour = '';
  let minute = '';
  let seconds = '';

  const _hour = parseInt(sec / 3600);
  hour = _hour < 10 ? '0' + _hour : _hour.toString();

  const _minute = parseInt((sec % 3600) / 60);
  minute = _minute < 10 ? '0' + _minute : _minute.toString();

  const _seconds = parseInt(sec % 60);
  seconds = _seconds < 10 ? '0' + _seconds : _seconds.toString();

  const time = `${hour} : ${minute} : ${seconds}`;

  return time;
};