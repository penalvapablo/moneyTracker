import axios from 'axios'

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:8080/api';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
};

export default axiosClient;

export async function getRequest(URL) {
  const res = await axiosClient.get(`/${URL}`)
  return res
}

export async function postRequest(URL, payload) {
  const res = await axiosClient.post(`/${URL}`, payload)
  return res;
}

export async function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export async function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response);
}

