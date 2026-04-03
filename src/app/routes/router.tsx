import { createBrowserRouter } from 'react-router-dom';
import CatalogPage from '@/pages/catalog';
import SkillPage from '@/pages/skill';
import LoginPage from '@/pages/login';
import AboutPage from '@/pages/about';
import ProfilePage from '@/pages/profile';
import FavoritesPage from '@/pages/favorites';
import CreatePage from '@/pages/create';
import NotFoundPage from '@/pages/not-found';

import { PrivateRoute } from '@/app/routes/PrivateRoute';
import { RegisterPage } from '@/pages/register';
import { RegisterStep1 } from '@/features/auth/RegisterStep1';
import { RegisterStep2 } from '@/features/auth/RegisterStep2';
import { RegisterStep3 } from '@/features/auth/RegisterStep3';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CatalogPage />,
  },
  {
    path: '/skill/:id',
    element: <SkillPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    children: [
      {
        index: true,
        element: <RegisterStep1 />,
      },
      {
        path: "step-2",
        element: <RegisterStep2 />,
      },
      {
        path: "step-3",
        element: <RegisterStep3 />,
      },
    ],
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/favorites',
    element: (
      <PrivateRoute>
        <FavoritesPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/create',
    element: (
      <PrivateRoute>
        <CreatePage />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);