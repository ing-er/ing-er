/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function registUserInfoAsync(formData) {
  const response = await axios.post(
    `http://localhost:8080/api/v1/users/regist`,
    formData
  );
	console.log(response.data)
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
    'http://3.140.150.124:5000/api/auth/updateuser',
    data,
    {
      headers: {
        xauth: token,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return response.data;
}
