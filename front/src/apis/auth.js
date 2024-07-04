import axiosInstance from './axios';
import API_URLS from '../constants/urls';

const login = async (data) => {
  const response = await axiosInstance.post(API_URLS.AUTH.LOGIN_URL(), data);
  return response.data;
};

const AUTH_API = {
  login,
};

export default AUTH_API;
