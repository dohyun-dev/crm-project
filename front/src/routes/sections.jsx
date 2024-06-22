import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import CampaignPage from 'src/pages/campaign';
import UserEditPage from 'src/pages/user-edit';
import UserCreatePage from 'src/pages/user-create';
import DashboardLayout from 'src/layouts/dashboard';
import CampaignEditPage from 'src/pages/campaign-edit';
import CampaignCreatePage from 'src/pages/campaign-create';

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: '/',
          element: <Navigate to="/campaign/place-traffic" replace />,
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
