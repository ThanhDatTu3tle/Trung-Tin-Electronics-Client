import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'http://localhost:8080/api/v1/';

const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify(params),
});

// Add an interceptor to set the authorization header for each request
axiosClient.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Add an interceptor to handle the response data
axiosClient.interceptors.response.use(response => {
  return response.data;
}, error => {
  // Handle errors here or rethrow them to be caught by the caller
  throw error;
});

export default axiosClient;