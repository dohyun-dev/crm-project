import { Helmet } from 'react-helmet-async';

import CampaignCreateView from '../sections/campaign-create/campaign-create-view';

export default function CampaignCreatePage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <CampaignCreateView />
    </>
  );
}
