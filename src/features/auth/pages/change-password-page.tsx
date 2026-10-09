import { Navigate } from "react-router-dom";
import ChangePasswordForm from "../components/change-password-form";
import { getAuthToken } from "@/lib/auth-token";
import { useLocalePath } from "@/lib/use-locale-path";

function ChangePasswordPage() {
  const localePath = useLocalePath();

  if (!getAuthToken()) {
    return <Navigate to={localePath("/login")} replace />;
  }

  return <ChangePasswordForm />;
}

export default ChangePasswordPage;
