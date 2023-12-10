import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = token;
  return config;
});