import { Helmet } from 'react-helmet-async';

import CampaignEditView from '../sections/campaign-edit/campaign-edit-view';

export default function CampaignEditPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <CampaignEditView />
    </>
  );
}
