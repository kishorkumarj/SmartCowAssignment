import axios from 'axios';
import * as siteConfig from '../config';
import * as constants from './constants';

const API = axios.create({
  baseURL: siteConfig.default.apiURL,
  timeout: siteConfig.default.apiTimeout,
  withCredentials: true
});


API.interceptors.request.use(
  config => {
      const token = localStorage.getItem(constants.authToken);
      if (token && config.url && config.url !== '/get-auth-tokens/') {
          config.headers['Authorization'] = 'Token ' + token;
      }
      return config;
  },
  error => {
      Promise.reject(error)
});

API.interceptors.response.use( response => {
  return response
},
error => {
  if (!error.response){
      return Promise.reject(error);
  }

  try{
    if (error.response.status === 401) {
      if (error.response.config.url && !error.response.config.url.includes('/auth/login')){
        // If unauthorized response, then remove the token and reload the page.
        localStorage.removeItem(constants.authToken);
        window.location.reload();
      }
    }
  }catch(err){}

  return Promise.reject(error);
});

export default API;
