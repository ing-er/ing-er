import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 방 입장 시 custom session name 얻기
export const getCustomSessionAsync = async (userId, category) => {
  // category code: 4,5,6,7,8
  const url = `${SERVER_URL}conference/enterroom/${userId}/${category}`;

  const response = await axios.get(url);
  return response
}

// 방 퇴장 시 기록 patch
export const patchLeaveSession = (userId, sessionId) => {
  const url = `${SERVER_URL}conference/exitroom`;
  const formData = {
    userId,
    session: sessionId,
  }

  const response = axios.patch(url, formData);
  return response
}


// 휴식 시작 시 기록 post
export const postStartRest = (userId, sessionId) => {
  const url = `${SERVER_URL}conference/reststart`;
  const formData = {
    userId,
    session: sessionId,
  }

  const response = axios.post(url, formData);
  return response
}

// 휴식 종료 시 기록 patch
export const patchEndRest = (userId, sessionId) => {
  const url = `${SERVER_URL}conference/restend`;
  const formData = {
    userId,
    session: sessionId,
  }

  const response = axios.patch(url, formData);
  return response
}