/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function getUserInfoAsync(data) {
  const response = await axios.get(
		// `http://localhost:8080/api/v1/admin/getUserByName/${data}`,
		`http://localhost:8080/api/v1/admin/getUserByName/${data}`,
    // `http://i5a208.p.ssafy.io:8080/api​/v1​/admin​/getUserByName​/${data}`,
  );
  return response.data;
}

export async function updateUserCodeAsync(formData) {
  const response = await axios.patch(
		`http://localhost:8080/api/v1/admin/setAdmin`,
		// `http://i5a208.p.ssafy.io:8080/api/v1/admin/setAdmin`,
		formData,
  );
  return response.data;
}

export async function getCommonCodeAsync() {
  const response = await axios.get(
		`http://localhost:8080/api/v1/admin/getCommonCodeList`,
		// `http://i5a208.p.ssafy.io:8080/api/v1/admin/getCommonCodeList`,
  );
  return response.data;
}

export async function deleteCommonCodeAsync(data) {
  const response = await axios.delete(
		`http://localhost:8080/api/v1/admin/deleteCommonCode/${data}`,
		// `http://i5a208.p.ssafy.io:8080/api/v1/admin/deleteCommonCode/${data}`,
  );
  return response.data;
}

export async function updateCommonCodeAsync(data) {
  const response = await axios.post(
		`http://localhost:8080/api/v1/admin/setCommonCode/${data}`,
		// `http://i5a208.p.ssafy.io:8080/api/v1/admin/setCommonCode/${data}`,
  );
  return response.data;
}

export async function getDetailCodeAsync() {
  const response = await axios.get(
		`http://localhost:8080/api/v1/admin/getDetailsCodeById`,
		// `http://i5a208.p.ssafy.io:8080/api/v1/admin/getDetailsCodeById`,
  );
  return response.data;
}

export async function deleteDetailCodeAsync(data) {
  const response = await axios.delete(
		`http://localhost:8080/api/v1/admin/deleteDetailsCode/${data}`,
		// `http://i5a208.p.ssafy.io:8080/api/v1/admin/deleteDetailsCode/${data}`,
  );
  return response.data;
}

// export async function updateDetailCodeAsync(data) {
//   const response = await axios.post(
// 		`http://localhost:8080/api/v1/admin/setDetailCode/${data}`,
//   );
//   return response.data;
// }
