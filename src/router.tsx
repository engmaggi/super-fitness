import { createBrowserRouter } from "react-router-dom";
import ResetPasswordPage from "@/features/auth/pages/reset-password-page";
import ChangePasswordPage from "@/features/auth/pages/change-password-page";
import LoginPage from "./features/auth/pages/login-page";
import RegisterPage from "./features/auth/pages/register";

export const router = createBrowserRouter([
  {
    path: "/auth",

    children: [
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "change-password", element: <ChangePasswordPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);
