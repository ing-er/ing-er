import { ControlPointSharp } from '@material-ui/icons';
import axios from 'axios';

export async function loginAsync(formData) {
  const response = await axios.get(
    `http://localhost:8080/api/v1/users/${formData.oAuthId}`
    );
    console.log(response)
  //   if (response.data == ''){
  // }
  // else {
  // }
  localStorage.setItem('CURRENT_USER', formData.oAuthId);
return formData.oAuthId;
}

export async function isAuthAsync() {
  console.log('auth sync')
  const token = localStorage.getItem('CURRENT_USER');
  console.log(token)
  const response = await axios.get(
    `http://localhost:8080/api/v1/users/${token}/`,
    // {
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
  console.logo(response.data)
  localStorage.setItem('CURRENT_USER', JSON.stringify(response.data));
  return response.data;
}