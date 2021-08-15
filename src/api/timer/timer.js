import axios from 'axios';

// common variables
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// get user's study time
export const getStudyTime = async (userId, date) => {
  const url = `${SERVER_URL}timer/${userId}/${date}`
  
  const response = await axios.get(url);
  return response
}

// save user's current study time
export const setStudyTime = async (userId, studyTime, date) => {
  const url = `${SERVER_URL}timer/regist`
  const formData = {
    date,
    studyTime,
    userId
  }

  const response = await axios.post(url, formData);
  return response
}