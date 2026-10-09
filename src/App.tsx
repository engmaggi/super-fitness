import { useRoutes, type RouteObject } from "react-router-dom";
import AuthLayout from "@/features/auth/components/auth-layout";
import RegisterPage from "@/features/auth/pages/register";
import DesignPage from "@/features/design-system/pages/design";
import HomePage from "@/features/home/pages/home-page";
import HealthyPage from "@/features/healthy/pages/healthy-page";
import MealDetailsPage from "@/features/healthy/pages/meal-details-page";
import LocaleLayout from "@/components/locale-layout";
import MainLayout from "@/components/main-layout";
import ResetPasswordPage from "./features/auth/pages/reset-password-page";
import ChangePasswordPage from "./features/auth/pages/change-password-page";
import LoginPage from "./features/auth/pages/login-page";
import AboutPage from "./features/about/pages/about-page";
import { ProfileGrid } from "./features/profile";
import ClassPage from "./features/class/pages/class-page";
import ClassDetailsPage from "./features/class/pages/class-details-page";


function pages(): RouteObject[] {
  return [
    {
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "classes", element: <ClassPage /> },
        { path: "classes/:id", element: <ClassDetailsPage /> },
        { path: "healthy", element: <HealthyPage /> },
        { path: "healthy/:id", element: <MealDetailsPage /> },
        { path: "settings", element: <ProfileGrid/> },
      ],
    },

    { path: "design", element: <DesignPage /> },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "auth/reset-password", element: <ResetPasswordPage /> },
        { path: "auth/change-password", element: <ChangePasswordPage /> },
      ],
    },
  ];
}

export default function App() {
  return useRoutes([
    { element: <LocaleLayout locale="en" />, children: pages() },
    { path: "ar", element: <LocaleLayout locale="ar" />, children: pages() },
  ]);
}
