import { createBrowserRouter } from 'react-router-dom';
import CatalogPage from '@/pages/catalog';
import SkillPage from '@/pages/skill';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import AboutPage from '@/pages/about';
import ProfilePage from '@/pages/profile';
import FavoritesPage from '@/pages/favorites';
import CreatePage from '@/pages/create';
import NotFoundPage from '@/pages/not-found';

import { PrivateRoute } from '@/app/routes/PrivateRoute';

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
    path: '/register',
    element: <RegisterPage />,
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