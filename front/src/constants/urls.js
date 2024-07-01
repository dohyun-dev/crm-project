const MEMBER = {
  BASE_URL: '/api/v1/members',
  CREATE_URL: () => MEMBER.BASE_URL,
  FETCH_MEMBER_URL: () => MEMBER.BASE_URL,
  GET_MEMBER_URL: (memberId) => `${MEMBER.BASE_URL}/${memberId}`,
  EDIT_MEMBER_URL: (memberId) => `${MEMBER.BASE_URL}/${memberId}`,
};

const CAMPAIGN = {
  BASE_URL: '/api/v1/campaigns',
  CREATE_URL: () => CAMPAIGN.BASE_URL,
  FETCH_CAMPAIGN_URL: () => CAMPAIGN.BASE_URL,
  GET_CAMPAIGN_URL: (campaignId) => `${CAMPAIGN.BASE_URL}/${campaignId}`,
  EDIT_CAMPAIGN_URL: (campaignId) => `${CAMPAIGN.BASE_URL}/${campaignId}`,
};

const API_URLS = {
  MEMBER,
  CAMPAIGN,
};

export default API_URLS;
