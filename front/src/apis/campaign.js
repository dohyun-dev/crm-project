import axiosInstance from './axios';
import API_URLS from '../constants/urls';

const createCampaign = async (data) => {
  const response = await axiosInstance.post(API_URLS.CAMPAIGN.CREATE_URL(), data);
  return response.data;
};

const CAMPAIGN_API = {
  createCampaign,
};

export default CAMPAIGN_API;
