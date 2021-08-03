/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function registUserInfoAsync(formData) {
  const response = await axios.post(
    `http://localhost:8080/api/v1/users/regist`,
    formData
  );
  return response.data;
}

export async function checkUserNicknameAsync(formData) {
  const response = await axios.post(
    `http://localhost:8080//api/v1/users/checkname/${formData}`,
  );
  if (response.status == '401'){
    throw new Error('이미 중복된 닉네임이 있습니다.');
  }
  return response.data;
}

export async function getUserInfoAsync(formData) {
  // const { token } = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const response = await axios.get(
    `http://localhost:8080/api/v1/regist`,
		formData,
    // {
    //   headers: {
    //     xauth: token,
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: true,
    // }
  );
  return response.data;
}

export async function postUserUpdateAsync(data) {
  const { token } = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const response = await axios.post(
    'http://localhost:8080/api/v1/regist',
    data,
  );
  return response.data;
}