import axiosInstance from './axios';
import API_URLS from '../constants/urls';

const createCampaign = async (data) => {
  const response = await axiosInstance.post(API_URLS.CAMPAIGN.CREATE_URL(), data);
  return response.data;
};

const editCampaign = async (campaignId, data) => {
  const response = await axiosInstance.put(API_URLS.CAMPAIGN.EDIT_CAMPAIGN_URL(campaignId), data);
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

const deleteCampaign = async (campaignId) => {
  const response = await axiosInstance.delete(API_URLS.CAMPAIGN.DELETE_CAMPAIGN_URL(campaignId));
  return response.data;
};

const changeCampaignState = async (campaignIds, campaignState) => {
  const response = await axiosInstance.put(API_URLS.CAMPAIGN.CHANGE_STATE_URL(), {
    campaignIds,
    campaignState,
  });
  return response.data;
};

const extend = async (campaignIds, extendDays) => {
  const response = await axiosInstance.put(API_URLS.CAMPAIGN.EXTEND_URL(), {
    campaignIds,
    extendDays,
  });
  return response.data;
};

const CAMPAIGN_API = {
  createCampaign,
  fetchCampaign,
  getCampaign,
  editCampaign,
  deleteCampaign,
  changeCampaignState,
  extend,
};

export default CAMPAIGN_API;
