/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function registUserInfoAsync(formData) {
  const response = await axios.post(
    `http://localhost:8080/api/v1/users/regist`,
    formData
  );
  return response.data;
}

export async function WithdrawalUserAsync(kakaoIdNum) {
  const response = await axios.delete(
    `http://localhost:8080/api/v1/users/${kakaoIdNum}`,
  );
  if (response.status == 401) {
    throw new Error("인증이 실패하였습니다.");
  }else if (response.status == 404) {
    throw new Error("존재하는 사용자가 없습니다.");
  }
  return response.data;
}

export async function editUserInfoAsync(formData) {

  const kakaoIdNum = Number(formData["kakaoIdNum"])
  const data = {
    category: formData.category,
    isOpen: formData.isOpen,
    name: formData.name
  }
  const response = await axios.patch(
    `http://localhost:8080/api/v1/users/modify/${kakaoIdNum}`,
    data
  );
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