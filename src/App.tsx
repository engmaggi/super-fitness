import { useRoutes, type RouteObject } from "react-router-dom";
import AuthLayout from "@/features/auth/components/auth-layout";
import RegisterPage from "@/features/auth/pages/register";
import DesignPage from "@/features/design-system/pages/design";
import HomePage from "@/features/home/pages/home-page";
import LocaleLayout from "@/components/locale-layout";
import MainLayout from "@/components/main-layout";
// import ResetPasswordPage from "./features/auth/pages/reset-password-page";
import ChangePasswordPage from "./features/auth/pages/change-password-page";
import LoginPage from "./features/auth/pages/login-page";
import AboutPage from "./features/about/pages/about-page";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 py-24">
      <h1 className="font-heading text-page-title">{title}</h1>
      <p className="mt-2 text-muted-foreground font-sans text-base">
        Coming soon
      </p>
    </div>
  );
}

function pages(): RouteObject[] {
  return [
    {
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "classes", element: <PlaceholderPage title="Classes" /> },
        { path: "healthy", element: <PlaceholderPage title="Healthy" /> },
        { path: "settings", element: <PlaceholderPage title="Settings" /> },
      ],
    },
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
