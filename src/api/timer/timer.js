import axios from 'axios';
import { getToday } from '../../utils/date';

// common variables
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const date = getToday();

// get user's study time
export const getStudyTime = async (userId) => {
  const url = `${SERVER_URL}timer/${userId}/${date}`
  
  const response = await axios.get(url);
  return response
}

// save user's current study time
export const setStudyTime = async (userId, studyTime) => {
  const url = `${SERVER_URL}timer/regist`
  const formData = {
    date,
    studyTime,
    userId
  }

  const response = await axios.post(url, formData);
  if (response.status === 200) {
    console.log('사용자 공부시간 업데이트 완료')
  }

  return response
}