import { Helmet } from 'react-helmet-async';

import UserEditView from '../sections/user-edit/user-edit-view';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserEditView />
    </>
  );
}
