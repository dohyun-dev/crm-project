import axiosInstance from './axios';
import API_URLS from '../constants/urls';

const createCampaign = async (data) => {
  const response = await axiosInstance.post(API_URLS.CAMPAIGN.CREATE_URL(), data);
  return response.data;
};

const fetchCampaign = async (params) => {
  const response = await axiosInstance.get(API_URLS.CAMPAIGN.FETCH_CAMPAIGN_URL(), { params });
  return response.data;
};

const getCampaign = async (campaignId) => {
  const response = await axiosInstance.get(API_URLS.CAMPAIGN.GET_CAMPAIGN_URL(campaignId));
  return response.data;
};

const CAMPAIGN_API = {
  createCampaign,
  fetchCampaign,
  getCampaign,
};

export default CAMPAIGN_API;
