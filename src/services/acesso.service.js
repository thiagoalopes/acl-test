import axios from '../config/axios.js';

export default {

    async login() {
        return new Promise((resolve, reject) => {
            axios.get('/redirect',{withCredentials: true})
            .then(res => {
               resolve(res.data.token);
            })
            .catch(e => {
               reject(e);
               console.error(e.message);
               location.href = process.env.VITE_APP_REDIRECT_LOGIN?process.env.VITE_APP_REDIRECT_LOGIN:'#';
            });
         }); 
      }
};