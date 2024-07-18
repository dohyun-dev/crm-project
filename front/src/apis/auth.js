import axiosInstance from './axios';
import API_URLS from '../constants/urls';

const login = async (data) => {
  const response = await axiosInstance.post(API_URLS.AUTH.LOGIN_URL(), data);
  return response.data;
};

const reissue = async () => {
  const response = await axiosInstance.post(API_URLS.AUTH.REISSUE());
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.post(API_URLS.AUTH.LOGOUT());
  return response;
};

const AUTH_API = {
  login,
  reissue,
  logout,
};

export default AUTH_API;
