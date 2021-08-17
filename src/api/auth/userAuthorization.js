import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function loginAsync(formData) {
  const response = await axios.get(
    `${SERVER_URL}users/${formData.oAuthId}`
    );
  window.localStorage.setItem('CURRENT_USER', formData.oAuthId);
  //* 이미 등록된 유저일 때,
  if (response.data != ''){
    return response.data
  }
  //* 등록되지 않은 유저일 때,
return formData.oAuthId;
}

export async function testLoginAsync(formData) {
  const response = await axios.get(
    `${SERVER_URL}users/${formData.oAuthId}`
    );
    //* 이미 등록된 유저일 때,
    if (response.data != ''){
    window.localStorage.setItem('CURRENT_USER', formData.oAuthId);
    return response.data
  }
  //* 등록되지 않은 유저일 때,
return 'fail';
}

export async function isAuthAsync() {
  const token = window.localStorage.getItem('CURRENT_USER');
  //* 처음 이용하는 사용자
  if (token == null){
    return 1
  }
  const response = await axios.get(
    `${SERVER_URL}users/${token}`,
    // { 헤더 추가할 일 있으면 써야지
    //   headers: {
    //     xauth: token,
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: true,
    // }
  );
  if (!response.status == 200) {
    throw new Error('사용자 인증에 실패했습니다.');
  }
  //* 회원가입을 하려는 사용자
  if (response.data == "") {
    return 2
  }
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