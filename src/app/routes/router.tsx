import { Routes, Route } from 'react-router-dom';

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

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/skill/:id" element={<SkillPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />}>
        <Route index element={<RegisterStep1 />} />
        <Route path="step-2" element={<RegisterStep2 />} />
        <Route path="step-3" element={<RegisterStep3 />} />
      </Route>

      <Route path="/about" element={<AboutPage />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};