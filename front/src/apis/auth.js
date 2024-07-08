import API_URLS from '../constants/urls';
import axiosInstance, { axiosInstance2 } from './axios';

const login = async (data) => {
  const response = await axiosInstance.post(API_URLS.AUTH.LOGIN_URL(), data);
  return response.data;
};

const reissue = async () => {
  const response = await axiosInstance2.post(API_URLS.AUTH.reissue());
  return response.data;
};

const AUTH_API = {
  login,
  reissue,
};

export default AUTH_API;
