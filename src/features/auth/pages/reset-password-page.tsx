import { useLocation, Navigate } from "react-router-dom";
import ResetPasswordForm from "../components/reset-password-form";

function ResetPasswordPage() {
  const { state } = useLocation();
  // const email = state?.email as string | undefined;

  // TEMPORARY while the OTP step isn't ready: use a test email instead of redirecting
  const email = state?.email ?? "test@example.com";

  if (!email) return <Navigate to="/auth/forgot-password" replace />;

  return <ResetPasswordForm email={email} />;
}

export default ResetPasswordPage;