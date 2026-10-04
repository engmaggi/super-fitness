
import { createBrowserRouter } from "react-router-dom";
import ResetPasswordPage from "@/features/auth/pages/reset-password-page";
import LoginPage from "./features/auth/pages/login-page";
import SignupPage from "./features/auth/pages/signup-page";

export const router = createBrowserRouter([
    {
        path: "/auth",

        children: [
            { path: "reset-password", element: <ResetPasswordPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
        ],
    },
]);