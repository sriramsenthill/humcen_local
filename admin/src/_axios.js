import axios from "axios";

const basePath = '/api/admin';
axios.defaults.baseURL = (process.env.HUMCEN_SERVER_HOST || process.env.NEXT_PUBLIC_HUMCEN_SERVER_HOST || '') + basePath;
console.log('axios.defaults.baseURL-->', axios.defaults.baseURL);

axios.interceptors.request.use((config) => {
  if (config.url.indexOf('/api/noauth/') > -1) {
    config.baseURL = config.baseURL?.replace(basePath, '');
  }

  const token = globalThis?.localStorage?.getItem('token');
  if (token) config.headers['Authorization'] = token;
  return config;
});