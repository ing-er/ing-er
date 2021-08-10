/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function getUserInfoAsync(data) {
	console.log('async');
	console.log(data);
  const response = await axios.get(
		`http://localhost:8080/api/v1/admin/getUserByName/${data}`,
		// `http://localhost:8080/api/v1/admin/getUserByName/${data}`,
    // `http://i5a208.p.ssafy.io:8080/api​/v1​/admin​/getUserByName​/${data}`,
  );
  return response.data;
}

export async function updateUserCodeAsync(formData) {
  const response = await axios.patch(
		`http://localhost:8080/api/v1/admin/setAdmin`,
		formData,
  );
  return response.data;
}
