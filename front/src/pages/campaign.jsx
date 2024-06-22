import { Helmet } from 'react-helmet-async';

import CampaignView from '../sections/campaign/view/campaign-view';

// ----------------------------------------------------------------------

export default function CampaignPage() {
  return (
    <>
      <Helmet>
        <title> 캠페인 관리 </title>
      </Helmet>

      <CampaignView />
    </>
  );
}
