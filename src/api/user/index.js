import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getUserCalendarInfo = async (userId, date) => {
  const url = `${SERVER_URL}calendar/${userId}/${date}`
  const response = await axios.get(url);

  return response;
}

export const getUserInfo = async (userData) => {
  const kakaonum = userData.kakaoIdNum;
  const url = `${SERVER_URL}users/${kakaonum}`

  const response = await axios.get(url);
  return response;
}

export const getUserCalendarList = async (userId) => {
  const url = `${SERVER_URL}calendar/list/${userId}`

  const response = await axios.get(url);
  return response
}