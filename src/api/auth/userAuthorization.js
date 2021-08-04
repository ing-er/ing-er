import axios from 'axios';

export async function loginAsync(formData) {
  const response = await axios.get(
    `http://localhost:8080/api/v1/users/${formData.oAuthId}`
    );
  window.localStorage.setItem('CURRENT_USER', formData.oAuthId);
  //* 이미 등록된 유저일 때,
  if (response.data != ''){
    return response.data
  }
  //* 등록되지 않은 유저일 때,
return formData.oAuthId;
}

export async function isAuthAsync() {
  const token = window.localStorage.getItem('CURRENT_USER');
  if (token == null){
    return 1
  }
  const response = await axios.get(
    `http://localhost:8080/api/v1/users/${token}/`,
    // { 헤더 추가할 일 있으면 써야지
    //   headers: {
    //     xauth: token,
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: true,
    // }
  );
  console.log(response)
  if (!response.status == 200) {
    throw new Error('사용자 인증에 실패했습니다.');
  }
  if (response.data == "") {
    return 2
  }
  return response.data;
}