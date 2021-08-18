/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function registUserInfoAsync(formData) {
  const response = await axios.post(
    `${SERVER_URL}users/regist`,
    formData
  );
  return response.data;
}

export async function WithdrawalUserAsync() {
  const kakaoIdNum = window.localStorage.getItem('CURRENT_USER');
  const response = await axios.delete(
    `${SERVER_URL}users/${kakaoIdNum}`,
  );
  if (response.status == 401) {
    throw new Error("인증이 실패하였습니다.");
  }else if (response.status == 404) {
    throw new Error("존재하는 사용자가 없습니다.");
  }
  window.localStorage.removeItem('CURRENT_USER');
  return response.data;
}

export async function editUserInfoAsync(formData) {

  const kakaoIdNum = window.localStorage.getItem('CURRENT_USER');
  const data = {
    category: formData.category,
    isOpen: formData.isOpen,
    name: formData.name
  }
  const response = await axios.patch(
    `${SERVER_URL}users/modify/${kakaoIdNum}`,
    data
  );
  return response.data;
}

export async function getUserInfoAsync() {
  const kakaoIdNum = window.localStorage.getItem('CURRENT_USER');
  const response = await axios.get(
    `${SERVER_URL}users/${kakaoIdNum}`,
  );
  return response.data;
}

export async function postUserUpdateAsync(data) {
  const response = await axios.post(
    `${SERVER_URL}regist`,
    data,
  );
  return response.data;
}