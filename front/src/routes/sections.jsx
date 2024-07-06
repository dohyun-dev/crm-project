import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import CampaignPage from 'src/pages/campaign';
import UserEditPage from 'src/pages/user-edit';
import UserCreatePage from 'src/pages/user-create';
import DashboardLayout from 'src/layouts/dashboard';
import CampaignEditPage from 'src/pages/campaign-edit';
import CampaignCreatePage from 'src/pages/campaign-create';

import { authState } from '../recoil/atoms';

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------
const ProtectedLoginRoute = () => {
  const [memberInfo, setMemberInfo] = useRecoilState(authState);

  useEffect(() => {
    if (!memberInfo.accessToken) {
      Swal.fire({
        title: '로그인해주세요',
        icon: 'warning',
        confirmButtonText: '확인',
      });
    }
  }, [memberInfo]);

  return memberInfo.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default function Router() {
  const routes = useRoutes([
    {
      element: <ProtectedLoginRoute />,
      children: [
        {
          element: (
            <DashboardLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            {
              path: '/',
              element: <Navigate to="/campaign/placeTraffic" replace />,
              index: true,
            },
            { path: 'user', element: <UserPage /> },
            { path: 'user/new', element: <UserCreatePage /> },
            { path: 'user/edit/:userId', element: <UserEditPage /> },
            { path: 'campaign/:type', element: <CampaignPage /> },
            { path: 'campaign/create', element: <CampaignCreatePage /> },
            { path: 'campaign/edit/:campaignId', element: <CampaignEditPage /> },
          ],
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
