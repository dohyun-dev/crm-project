import { Helmet } from 'react-helmet-async';

import UserCreateView from '../sections/user-create/user-create-view';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserCreateView />
    </>
  );
}
