import axiosInstance from './axios';
import API_URLS from '../constants/urls';

const createMember = async (data) => {
  const response = await axiosInstance.post(API_URLS.MEMBER.CREATE_URL(), data);
  return response.data;
};

const MEMBER_API = {
  createMember,
};

export default MEMBER_API;
