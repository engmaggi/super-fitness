import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createChangePasswordSchema } from "../utils/change-password-schema";
import { changePassword } from "../api/change-password";
import { EyeOff, Eye, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/lib/use-locale-path";
import { clearAuthToken } from "@/lib/auth-token";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type FormErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  form?: string;
};

function ChangePasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [serverError, setServerError] = useState("");

  const result = createChangePasswordSchema(t).safeParse({
    currentPassword,
    newPassword,
    confirmNewPassword,
  });
  const errors: FormErrors = {};
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormErrors;
      errors[field] ??= issue.message;
    }
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ currentPassword: true, newPassword: true, confirmNewPassword: true });
    if (!result.success) return;

    try {
      setServerError("");
      await changePassword({
        password: currentPassword,
        newPassword,
      });
      clearAuthToken();
      toast.success(t("auth.passwordUpdated"));
      navigate(localePath("/login"));
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : t("auth.errors.changePasswordFailed"),
      );
    }
  }

  return (
    <div className="flex flex-col gap-6 justify-center w-140 align-middle mx-auto px-6 py-30">
      <h1 className="font-extrabold text-5xl">{t("auth.changePasswordTitle")}</h1>

      <div className="border border-chart-2 rounded-4xl p-10 flex flex-col gap-4">
        <h3 className="text-[22px] text-foreground">{t("auth.strongPasswordHint")}</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
              <Input
                className="normal-case pe-10 ps-11"
                type={showCurrentPassword ? "text" : "password"}
                placeholder={t("auth.currentPassword")}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setTouched((current) => ({ ...current, currentPassword: true }));
                }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label={
                  showCurrentPassword ? t("auth.hidePassword") : t("auth.showPassword")
                }
                className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.currentPassword && errors.currentPassword && (
              <p className="text-sm font-medium text-destructive">{errors.currentPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
              <Input
                className="normal-case pe-10 ps-11"
                type={showNewPassword ? "text" : "password"}
                placeholder={t("auth.newPassword")}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setTouched((current) => ({ ...current, newPassword: true }));
                }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.newPassword && errors.newPassword && (
              <p className="text-sm font-medium text-destructive">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm password field  */}
          <div className="flex flex-col gap-1 mb-2">
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
              <Input
                className="normal-case pe-10 ps-11"
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder={t("auth.confirmNewPassword")}
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  setTouched((current) => ({ ...current, confirmNewPassword: true }));
                }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                aria-label={
                  showConfirmNewPassword ? t("auth.hidePassword") : t("auth.showPassword")
                }
                className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.confirmNewPassword && errors.confirmNewPassword && (
              <p className="text-sm font-medium text-destructive">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>

          {/* Backend/network errors go here*/}
          {serverError && (
            <p className="text-sm font-medium text-destructive">{serverError}</p>
          )}

          <Button type="submit" variant="cta">
            {t("auth.changePassword")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
