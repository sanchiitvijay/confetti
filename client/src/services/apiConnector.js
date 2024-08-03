import axios from 'axios';
import { setUser } from '../slices/profileSlice';
import { setToken } from '../slices/authSlice';
import { store } from '../index';
import {toast} from "react-hot-toast";
export const axiosInstance = axios.create({
  withCredentials: true, 
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Dispatch actions to reset user and token
      store.dispatch(setUser(null));
      store.dispatch(setToken(null));
      toast.error("Session expired, Please log in again")
      window.location.href = '/';
      
    }
    return Promise.reject(error);
  }
);

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : {},
    params: params ? params : {},
  });
};
