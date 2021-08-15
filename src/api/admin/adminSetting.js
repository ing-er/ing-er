/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function getUserInfoAsync(data) {
  const response = await axios.get(
		`${SERVER_URL}admin/getUserByName/${data}`,
  );
  return response.data;
}

export async function updateUserCodeAsync(formData) {
  const response = await axios.patch(
		`${SERVER_URL}admin/setAdmin`,
		formData,
  );
  return response.data;
}

export async function getCommonCodeAsync() {
  const response = await axios.get(
		`${SERVER_URL}admin/getCommonCodeList`,
  );
  return response.data;
}

export async function deleteCommonCodeAsync(data) {
  const response = await axios.delete(
		`${SERVER_URL}admin/deleteCommonCode/${data}`,
  );
  return response.data;
}

export async function updateCommonCodeAsync(data) {
  const response = await axios.post(
		`${SERVER_URL}admin/setCommonCode/${data}`,
  );
  return response.data;
}

export async function patchCommonCodeAsync(data) {
  const response = await axios.patch(
		`${SERVER_URL}admin/updateCommonCode/${data.id}/${data.kind}`,
  );
  return response.data;
}

export async function getDetailCodeAsync() {
  const response = await axios.get(
		`${SERVER_URL}admin/getDetailsCodeById`,
  );
  return response.data;
}

export async function deleteDetailCodeAsync(data) {
  const response = await axios.delete(
		`${SERVER_URL}admin/deleteDetailsCode/${data}`,
  );
  return response.data;
}

export async function updateDetailCodeAsync(data) {
  const response = await axios.post(
		`${SERVER_URL}admin/setDetailsCode/${data.name}/${data.type}`,
  );
  if (response.status == 200){
    return response.data;
  };
  return {message: 'fail'};
}

