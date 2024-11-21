import axios from 'axios';

const api = axios.create({
  baseURL: 'https://collective-violante-avater-dffc8fee.koyeb.app/api',
});

export default api;
