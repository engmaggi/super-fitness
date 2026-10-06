import { useRoutes, type RouteObject } from "react-router-dom";
import AuthLayout from "@/features/auth/components/auth-layout";
import RegisterPage from "@/features/auth/pages/register";
import DesignPage from "@/features/design-system/pages/design";
import HomePage from "@/features/home/pages/home-page";
import LocaleLayout from "@/components/locale-layout";
// import ResetPasswordPage from "./features/auth/pages/reset-password-page";
import ChangePasswordPage from "./features/auth/pages/change-password-page";
import LoginPage from "./features/auth/pages/login-page";

function pages(): RouteObject[] {
  return [
    { index: true, element: <HomePage /> },
    { path: "design", element: <DesignPage /> },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        // { path: "auth/reset-password", element: <ResetPasswordPage /> },
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
