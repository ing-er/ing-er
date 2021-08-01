import axios from 'axios';

export async function loginAsync(formData) {
  const response = await axios.get(
    `http://localhost:8080/api/v1/users/${formData.oAuthId}`
    );
    if (response.data == ''){
      // localStorage.setItem('CURRENT_USER', JSON.stringify(response.data));
      localStorage.setItem('CURRENT_USER', formData.oAuthId);
  }
  else {
  if (!response.data.loginSuccess) {
    throw new Error('로그인에 실패했습니다.');
  }
}
return formData.oAuthId;
}

export async function isAuthAsync() {
  // console.log('isauthasyn')
  const { token } = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const response = await axios.get(
    'http://localhost:8080/api/v1/users/register',
    {
      headers: {
        xauth: token,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  if (!response.data.isAuth) {
    throw new Error('사용자 인증에 실패했습니다.');
  }
  localStorage.setItem('CURRENT_USER', JSON.stringify(response.data));
  return response.data;
}