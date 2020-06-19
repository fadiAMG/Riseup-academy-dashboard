import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')} ` },
});

export default {
  getData: (url) =>
    instance({
      method: 'GET',
      url,
    }),

  postData: (url, data, { headers }) =>
    instance({
      method: 'POST',
      url,
      data,
      headers: {
        'content-type': 'application/json', // override instance defaults
      },
    }),
};
