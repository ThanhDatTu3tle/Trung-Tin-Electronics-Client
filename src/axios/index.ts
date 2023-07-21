// =========================================================================
import axios, { AxiosHeaders } from 'axios';
import queryString from 'query-string';

const baseUrl = 'http://localhost:8080/api/v1/'
const getToken = () => localStorage.getItem('token')

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify({ params })
})

axiosClient.interceptors.request.use( async (config) => {
  return {
    ...config,
    headers: Object.assign({
      'Content-Type': 'application/json',
      'authorization': getToken() ? `Bearer ${getToken()}`:''
    }) as AxiosHeaders
  }
})

axiosClient.interceptors.response.use(response => {
  if (response && response.data) return response.data
  return response
}, err => {
  if (!err.response) {
    return err
  }
  throw err.response
})

export default axiosClient;
