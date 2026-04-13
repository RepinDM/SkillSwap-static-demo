import { Routes, Route } from "react-router-dom";

import CatalogPage from "@/pages/catalog";
import SkillPage from "@/pages/skill";
import LoginPage from "@/pages/login";
import AboutPage from "@/pages/about";
import ProfilePage from "@/pages/profile";
import CreatePage from "@/pages/create";
import NotFoundPage from "@/pages/not-found";

import { PrivateRoute } from "@/app/routes/PrivateRoute";
import { RegisterPage } from "@/pages/register";
import { RegisterStep1 } from "@/features/auth/RegisterStep1";
import { RegisterStep2 } from "@/features/auth/RegisterStep2";
import { RegisterStep3 } from "@/features/auth/RegisterStep3";
import Layout from "@/shared/layouts/MainLayout";
import AuthMain from "@/shared/layouts/AuthLayout";
import PersonalSection from "@/pages/profile/sections/PersonalSection";
import RequestsSection from "@/pages/profile/sections/RequestsSection";
import ExchangesSection from "@/pages/profile/sections/ExchangesSection";
import ProfileFavoritesSection from "@/pages/profile/sections/FavoritesSection";
import SkillsSection from "@/pages/profile/sections/SkillsSection";
import NotificationsPage from "@/pages/notifications";

export const AppRouter = () => {
  return (
    <Routes>

      <Route element={<AuthMain />}>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />}>
          <Route index element={<RegisterStep1 />} />
          <Route path="step-2" element={<RegisterStep2 />} />
          <Route path="step-3" element={<RegisterStep3 />} />
        </Route>
      </Route>

      {/* страницы С layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/skill/:id" element={<SkillPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }>
          <Route index element={<PersonalSection />} />
          <Route path="requests" element={<RequestsSection />} />
          <Route path="exchanges" element={<ExchangesSection />} />
          <Route path="favorites" element={<ProfileFavoritesSection />} />
          <Route path="skills" element={<SkillsSection />} />
        </Route>

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
