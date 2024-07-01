import { Helmet } from 'react-helmet-async';

import CampaignEditView from '../sections/campaign-edit/campaign-edit-view';

export default function CampaignEditPage() {
  return (
    <>
      <Helmet>
        <title> 캠페인 수정 </title>
      </Helmet>

      <CampaignEditView />
    </>
  );
}
