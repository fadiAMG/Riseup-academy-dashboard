import axios from 'axios';
const token = localStorage.getItem('token');
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: { Authorization: `Bearer ${token} ` },
});

export default {
  getData: (url) =>
    instance({
      method: 'GET',
      url,
    }),

  postData: (url, data, method) =>
    instance({
      method,
      url,
      data,
    }),

  deleteData: (url) =>
    instance({
      method: 'DELETE',
      url,
    }),
};
