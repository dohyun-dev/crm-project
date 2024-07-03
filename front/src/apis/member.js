import axiosInstance from './axios';
import API_URLS from '../constants/urls';

const createMember = async (data) => {
  const response = await axiosInstance.post(API_URLS.MEMBER.CREATE_URL(), data);
  return response.data;
};

const getMember = async (memberId) => {
  const response = await axiosInstance.get(API_URLS.MEMBER.GET_MEMBER_URL(memberId));
  return response.data;
};

const fetchMember = async (params) => {
  const response = await axiosInstance.get(API_URLS.MEMBER.FETCH_MEMBER_URL(), { params });
  return response.data;
};

const editMember = async (memberId, data) => {
  const response = await axiosInstance.put(API_URLS.MEMBER.EDIT_MEMBER_URL(memberId), { ...data });
  return response.data;
};

const deleteMember = async (memberId) => {
  const response = await axiosInstance.delete(API_URLS.MEMBER.DELETE_MEMBER_URL(memberId));
  return response.data;
};

const MEMBER_API = {
  createMember,
  getMember,
  fetchMember,
  editMember,
  deleteMember,
};

export default MEMBER_API;
