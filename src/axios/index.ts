import axios from 'axios';
import queryString from 'query-string';

// const baseUrl = `http://localhost:8080/api/v1/`;
// console.log(baseUrl);
const baseUrl = `https://3a9a-27-3-194-126.ngrok-free.app/api/v1`;
const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify(params),
});

const imgurApiClient = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  paramsSerializer: params => queryString.stringify(params),
  // http2: false,
});

const clientId = '983c8532c49a20e'; // Thay YOUR_CLIENT_ID bằng Client ID của bạn từ Imgur
imgurApiClient.defaults.headers.common['Authorization'] = `Client-ID ${clientId}`;

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

export { axiosClient, imgurApiClient };
