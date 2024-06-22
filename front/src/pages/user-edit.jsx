import { Helmet } from 'react-helmet-async';

import UserCreateView from '../sections/user-create/user-create-view';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserCreateView />
    </>
  );
}
