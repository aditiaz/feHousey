import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://myhouse.fly.dev/api/v1',
  // https://myhouse.fly.dev/api/v1/
  // http://localhost:5000/api/v1
  // localhost:5000/api/v1
});

export const setAuthToken = token => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
  console.log(token);
};
