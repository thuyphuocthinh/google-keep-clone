// src/api/axiosInstance.js
import axios from 'axios';
import { DOMAIN } from '../constants';

const axiosInstance = axios.create({
  baseURL: DOMAIN,
  timeout: 2000,
  headers: { 'Content-Type': 'application/json'},
  withCredentials: true,
});

export default axiosInstance;
