export const getToday = () => {
  const leftpad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };
  const date = new Date();
  const today = `${date.getFullYear()}-${leftpad(date.getMonth() + 1)}-${leftpad(date.getDate())}`;
  return today;
};
