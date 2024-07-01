import { Helmet } from 'react-helmet-async';

import CampaignCreateView from '../sections/campaign-create/campaign-create-view';

export default function CampaignCreatePage() {
  return (
    <>
      <Helmet>
        <title> 캠페인 등록 </title>
      </Helmet>

      <CampaignCreateView />
    </>
  );
}
