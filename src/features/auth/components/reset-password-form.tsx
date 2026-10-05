import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPasswordSchema } from "../utils/password-schema";
import { resetPassword } from "../api/reset-password";
import { EyeOff, Eye, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/lib/use-locale-path";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type CreatePasswordFormProps = {
  email: string;
};
type FormErrors = { password?: string; confirmPassword?: string; form?: string };

function ResetPasswordForm({ email }: CreatePasswordFormProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const localePath = useLocalePath();
  // The actual values the user types
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show/hide toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Only show an error after the user has interacted with that field
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });

  // Separate from field errors — this is for backend/network failures
  const [serverError, setServerError] = useState("");

  // Re-run validation on every render, so errors always match the latest input
  const result = createPasswordSchema(t).safeParse({ password, confirmPassword });
  const errors: FormErrors = {};
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as "password" | "confirmPassword";
      errors[field] ??= issue.message; // keep only the first error per field
    }
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true }); // reveal errors even on empty fields
    if (!result.success) return; // stop here if validation failed

    try {
      setServerError("");
      await resetPassword({ email, newPassword: password });
       toast.success(t("auth.passwordUpdated"));
        navigate(localePath("/login"));
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : t("auth.errors.resetPasswordFailed"),
      );
    }
  }

  return (
      <div className="flex flex-col gap-6 justify-center w-140 align-middle mx-auto px-6 py-30">
      <h1 className="font-extrabold text-5xl">{t("auth.createNewPassword")}</h1>

      <div className="border border-chart-2 rounded-4xl p-10 flex flex-col gap-4">
        <h3 className="text-[22px] text-foreground">{t("auth.strongPasswordHint")}</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password field */}
          <div className="flex flex-col gap-1">
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 start-4 size-5 -translate-y-1/2 text-font-2" />
              <Input
                className="normal-case pe-10 ps-11"
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.newPassword")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setTouched((current) => ({ ...current, password: true }));
                }}
                // stop phones/extensions from auto-capitalizing or "fixing" the password
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-sm font-medium text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Confirm password field  */}
          <div className="flex flex-col gap-1 mb-2">
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 start-4 size-5 -translate-y-1/2 text-font-2" />
              <Input
                className="normal-case pe-10 ps-11"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("auth.confirmNewPassword")}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setTouched((current) => ({ ...current, confirmPassword: true }));
                }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? t("auth.hidePassword") : t("auth.showPassword")
                }
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-sm font-medium text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Backend/network errors go here*/}
          {serverError && (
            <p className="text-sm font-medium text-destructive">{serverError}</p>
          )}

          <Button type="submit" variant="cta">{t("auth.resetPassword")}</Button>
        </form>
      </div>
    </div>

  );
}

export default ResetPasswordForm;