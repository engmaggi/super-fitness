
import { createBrowserRouter } from "react-router-dom";
import ResetPasswordPage from "@/features/auth/pages/reset-password-page";
import LoginPage from "./features/auth/pages/login-page";

export const router = createBrowserRouter([
    {
        path: "/auth",

        children: [
            { path: "reset-password", element: <ResetPasswordPage /> },
            { path: "login", element: <LoginPage /> },
        ],
    },
]);