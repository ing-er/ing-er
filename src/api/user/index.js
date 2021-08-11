import axios from 'axios';
import { getToday } from '../../utils/date';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// const today = getToday();

export const getUserCalendarInfo = async (userId, date) => {
  const url = `${SERVER_URL}/${userId}/${date}`
  
  const response = await axios.get(url);

  return response;
}