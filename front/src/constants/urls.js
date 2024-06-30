const MEMBER = {
  BASE_URL: '/api/v1/members',
  CREATE_URL: () => MEMBER.BASE_URL,
  FETCH_MEMBER_URL: () => MEMBER.BASE_URL,
};

const CAMPAIGN = {
  BASE_URL: '/api/v1/campaigns',
  CREATE_URL: () => CAMPAIGN.BASE_URL,
  FETCH_CAMPAIGN_URL: () => CAMPAIGN.BASE_URL,
};

const API_URLS = {
  MEMBER,
  CAMPAIGN,
};

export default API_URLS;
