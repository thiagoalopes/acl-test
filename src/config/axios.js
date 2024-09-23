import axios from 'axios';

const api = axios.create({
   baseURL: import.meta.env.VITE_APP_API_BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
});

api.interceptors.request.use(
   async (config) => {
      if(localStorage.getItem('access_token')!==null)
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

      return config;
    },
    (error) => {
     return Promise.reject(error);
   }
 );

export default axios;