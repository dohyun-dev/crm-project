import Swal from 'sweetalert2';
import { lazy, Suspense, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  const [memberInfo] = useRecoilState(authState);

  useEffect(() => {
    if (!memberInfo.accessToken) {
      Swal.fire({
        title: '로그인해주세요',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  }, [memberInfo]);

  return memberInfo.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

const ProtectedAdminRoute = () => {
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth.role !== 'ADMIN') {
      Swal.fire({
        title: '접근 불가',
        text: '관리자만 접근할 수 있습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  }, [auth]);

  return auth.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" replace />;
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
            { path: 'campaign/:type', element: <CampaignPage /> },
            { path: 'campaign/create', element: <CampaignCreatePage /> },
            { path: 'campaign/edit/:campaignId', element: <CampaignEditPage /> },
            {
              element: <ProtectedAdminRoute />,
              children: [
                { path: 'user', element: <UserPage /> },
                { path: 'user/new', element: <UserCreatePage /> },
                { path: 'user/edit/:userId', element: <UserEditPage /> },
              ],
            },
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
