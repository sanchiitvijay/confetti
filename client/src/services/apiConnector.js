import axios from 'axios';
import { setUser } from '../slices/profileSlice';
import { setToken } from '../slices/authSlice';
import { store } from '../index';
import {toast} from "react-hot-toast";
export const axiosInstance = axios.create({
  withCredentials: true, 
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      let toastId;
      setTimeout(()=>{toastId=toast.loading("Session expired,logging out...")},1*500)
      setTimeout(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
     
        store.dispatch(setUser(null));
        store.dispatch(setToken(null));
        toast.dismiss(toastId)  
      },1*1000)

      
      
      setTimeout(()=>{toast.error("Session Expired,Login again")},2*1000)
      
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
